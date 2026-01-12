import { useState, useEffect, useMemo } from 'react';
import { format, differenceInMinutes, differenceInSeconds, addDays, isToday, isTomorrow, isYesterday } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useSettings, WorkSchedule } from '@/contexts/SettingsContext';

const IRELAND_TZ = 'Europe/Dublin';
const PUNE_TZ = 'Asia/Kolkata';

export type WorkStatus = 'before-work' | 'working' | 'lunch' | 'after-work';

interface TimeInfo {
  time: Date;
  formattedTime: string;
  formattedDate: string;
  dayIndicator: string;
  status: WorkStatus;
}

interface OffsetInfo {
  hours: number;
  minutes: number;
  text: string;
}

interface ProgressInfo {
  percentage: number;
  statusText: string;
  secondaryText: string;
  isBeforeWork: boolean;
  isAfterWork: boolean;
  lunchStartPercent: number;
  lunchEndPercent: number;
}

interface OverlapPeriod {
  irelandStart: string;
  irelandEnd: string;
  puneStart: string;
  puneEnd: string;
}

interface OverlapInfo {
  hasOverlap: boolean;
  periods: OverlapPeriod[];
  message: string;
  nextOverlapMessage?: string;
}

const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const getWorkStatus = (date: Date, schedule: WorkSchedule): WorkStatus => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentMinutes = hours * 60 + minutes;
  
  const startMinutes = parseTimeToMinutes(schedule.startTime);
  const lunchStartMinutes = parseTimeToMinutes(schedule.lunchStart);
  const lunchEndMinutes = parseTimeToMinutes(schedule.lunchEnd);
  const endMinutes = parseTimeToMinutes(schedule.endTime);

  if (currentMinutes < startMinutes) return 'before-work';
  if (currentMinutes >= startMinutes && currentMinutes < lunchStartMinutes) return 'working';
  if (currentMinutes >= lunchStartMinutes && currentMinutes < lunchEndMinutes) return 'lunch';
  if (currentMinutes >= lunchEndMinutes && currentMinutes < endMinutes) return 'working';
  return 'after-work';
};

const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(Math.abs(totalMinutes) / 60);
  const minutes = Math.abs(totalMinutes) % 60;
  
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

export const useTimezone = () => {
  const { settings } = useSettings();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setNow(new Date()),
      settings.updateFrequency === 'smooth' ? 1000 : 60000
    );
    return () => clearInterval(interval);
  }, [settings.updateFrequency]);

  const irelandTime = useMemo(() => toZonedTime(now, IRELAND_TZ), [now]);
  const puneTime = useMemo(() => toZonedTime(now, PUNE_TZ), [now]);

  const formatTimeDisplay = (date: Date): string => {
    if (settings.use24Hour) {
      return settings.showSeconds ? format(date, 'HH:mm:ss') : format(date, 'HH:mm');
    }
    return settings.showSeconds ? format(date, 'hh:mm:ss a') : format(date, 'hh:mm a');
  };

  const getDayIndicator = (localDate: Date, referenceDate: Date): string => {
    const localDay = format(localDate, 'yyyy-MM-dd');
    const refDay = format(referenceDate, 'yyyy-MM-dd');
    
    if (localDay === refDay) return 'Today';
    
    const refTomorrow = format(addDays(referenceDate, 1), 'yyyy-MM-dd');
    if (localDay === refTomorrow) return 'Tomorrow';
    
    const refYesterday = format(addDays(referenceDate, -1), 'yyyy-MM-dd');
    if (localDay === refYesterday) return 'Yesterday';
    
    return 'Today';
  };

  const irelandInfo: TimeInfo = useMemo(() => ({
    time: irelandTime,
    formattedTime: formatTimeDisplay(irelandTime),
    formattedDate: format(irelandTime, 'EEEE, dd MMM'),
    dayIndicator: 'Today',
    status: getWorkStatus(irelandTime, settings.irelandSchedule),
  }), [irelandTime, settings.use24Hour, settings.showSeconds, settings.irelandSchedule]);

  const puneInfo: TimeInfo = useMemo(() => ({
    time: puneTime,
    formattedTime: formatTimeDisplay(puneTime),
    formattedDate: format(puneTime, 'EEEE, dd MMM'),
    dayIndicator: getDayIndicator(puneTime, irelandTime),
    status: getWorkStatus(puneTime, settings.puneSchedule),
  }), [puneTime, irelandTime, settings.use24Hour, settings.showSeconds, settings.puneSchedule]);

  const offsetInfo: OffsetInfo = useMemo(() => {
    const diffMinutes = differenceInMinutes(puneTime, irelandTime);
    const hours = Math.floor(Math.abs(diffMinutes) / 60);
    const minutes = Math.abs(diffMinutes) % 60;
    
    let text = '';
    if (minutes === 0) {
      text = `Pune is ${hours} hour${hours !== 1 ? 's' : ''} ahead of UKI`;
    } else {
      text = `Pune is ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} ahead of UKI`;
    }
    
    return { hours, minutes, text };
  }, [puneTime, irelandTime]);

  const calculateProgress = (time: Date, schedule: WorkSchedule): ProgressInfo => {
    const startMinutes = parseTimeToMinutes(schedule.startTime);
    const lunchStartMinutes = parseTimeToMinutes(schedule.lunchStart);
    const lunchEndMinutes = parseTimeToMinutes(schedule.lunchEnd);
    const endMinutes = parseTimeToMinutes(schedule.endTime);
    const totalWorkMinutes = endMinutes - startMinutes;
    
    const currentHours = time.getHours();
    const currentMins = time.getMinutes();
    const currentMinutes = currentHours * 60 + currentMins;
    
    const lunchStartPercent = ((lunchStartMinutes - startMinutes) / totalWorkMinutes) * 100;
    const lunchEndPercent = ((lunchEndMinutes - startMinutes) / totalWorkMinutes) * 100;
    
    let percentage = 0;
    let statusText = '';
    let secondaryText = '';
    let isBeforeWork = false;
    let isAfterWork = false;
    
    if (currentMinutes < startMinutes) {
      isBeforeWork = true;
      percentage = 0;
      const minsUntilStart = startMinutes - currentMinutes;
      statusText = `Starts in ${formatDuration(minsUntilStart)}`;
      secondaryText = '';
    } else if (currentMinutes >= endMinutes) {
      isAfterWork = true;
      percentage = 100;
      const minsAfterEnd = currentMinutes - endMinutes;
      statusText = `Finished ${formatDuration(minsAfterEnd)} ago`;
      const minsUntilNextStart = (24 * 60 - currentMinutes) + startMinutes;
      secondaryText = `Next start in ${formatDuration(minsUntilNextStart)}`;
    } else if (currentMinutes >= lunchStartMinutes && currentMinutes < lunchEndMinutes) {
      percentage = ((currentMinutes - startMinutes) / totalWorkMinutes) * 100;
      const minsUntilLunchEnd = lunchEndMinutes - currentMinutes;
      statusText = `Lunch, ends in ${formatDuration(minsUntilLunchEnd)}`;
      secondaryText = '';
    } else {
      percentage = ((currentMinutes - startMinutes) / totalWorkMinutes) * 100;
      const minsWorked = currentMinutes - startMinutes - (currentMinutes > lunchEndMinutes ? (lunchEndMinutes - lunchStartMinutes) : 0);
      const minsUntilEnd = endMinutes - currentMinutes;
      statusText = `${formatDuration(minsWorked)} into work`;
      secondaryText = `Finishes in ${formatDuration(minsUntilEnd)}`;
    }
    
    return {
      percentage: Math.min(100, Math.max(0, percentage)),
      statusText,
      secondaryText,
      isBeforeWork,
      isAfterWork,
      lunchStartPercent,
      lunchEndPercent,
    };
  };

  const irelandProgress: ProgressInfo = useMemo(() => 
    calculateProgress(irelandTime, settings.irelandSchedule), 
    [irelandTime, settings.irelandSchedule]
  );

  const puneProgress: ProgressInfo = useMemo(() => 
    calculateProgress(puneTime, settings.puneSchedule), 
    [puneTime, settings.puneSchedule]
  );

  const overlapInfo: OverlapInfo = useMemo(() => {
    const irelandSchedule = settings.irelandSchedule;
    const puneSchedule = settings.puneSchedule;
    
    // Convert schedules to minutes
    const irelandStart = parseTimeToMinutes(irelandSchedule.startTime);
    const irelandLunchStart = parseTimeToMinutes(irelandSchedule.lunchStart);
    const irelandLunchEnd = parseTimeToMinutes(irelandSchedule.lunchEnd);
    const irelandEnd = parseTimeToMinutes(irelandSchedule.endTime);
    
    const puneStart = parseTimeToMinutes(puneSchedule.startTime);
    const puneLunchStart = parseTimeToMinutes(puneSchedule.lunchStart);
    const puneLunchEnd = parseTimeToMinutes(puneSchedule.lunchEnd);
    const puneEnd = parseTimeToMinutes(puneSchedule.endTime);
    
    // Offset in minutes (Pune ahead of Ireland)
    const offsetMins = offsetInfo.hours * 60 + offsetInfo.minutes;
    
    // Ireland work blocks (in Ireland time)
    const irelandBlocks = [
      { start: irelandStart, end: irelandLunchStart },
      { start: irelandLunchEnd, end: irelandEnd },
    ];
    
    // Pune work blocks converted to Ireland time
    const puneBlocksInIreland = [
      { start: puneStart - offsetMins, end: puneLunchStart - offsetMins },
      { start: puneLunchEnd - offsetMins, end: puneEnd - offsetMins },
    ];
    
    // Find overlaps
    const periods: OverlapPeriod[] = [];
    
    for (const irBlock of irelandBlocks) {
      for (const puBlock of puneBlocksInIreland) {
        const overlapStart = Math.max(irBlock.start, puBlock.start);
        const overlapEnd = Math.min(irBlock.end, puBlock.end);
        
        if (overlapStart < overlapEnd) {
          const irStartStr = `${String(Math.floor(overlapStart / 60)).padStart(2, '0')}:${String(overlapStart % 60).padStart(2, '0')}`;
          const irEndStr = `${String(Math.floor(overlapEnd / 60)).padStart(2, '0')}:${String(overlapEnd % 60).padStart(2, '0')}`;
          const puStartMins = overlapStart + offsetMins;
          const puEndMins = overlapEnd + offsetMins;
          const puStartStr = `${String(Math.floor(puStartMins / 60)).padStart(2, '0')}:${String(puStartMins % 60).padStart(2, '0')}`;
          const puEndStr = `${String(Math.floor(puEndMins / 60)).padStart(2, '0')}:${String(puEndMins % 60).padStart(2, '0')}`;
          
          periods.push({
            irelandStart: irStartStr,
            irelandEnd: irEndStr,
            puneStart: puStartStr,
            puneEnd: puEndStr,
          });
        }
      }
    }
    
    // Check if there's remaining overlap today
    const currentIrelandMins = irelandTime.getHours() * 60 + irelandTime.getMinutes();
    const remainingPeriods = periods.filter(p => parseTimeToMinutes(p.irelandEnd) > currentIrelandMins);
    
    let message = '';
    let nextOverlapMessage: string | undefined;
    
    if (remainingPeriods.length > 0) {
      message = 'Overlap today';
    } else if (periods.length > 0) {
      message = 'No overlap remaining today';
      nextOverlapMessage = `Next overlap: tomorrow ${periods[0].irelandStart} to ${periods[0].irelandEnd} UKI time`;
    } else {
      message = 'No overlap today';
    }
    
    return {
      hasOverlap: remainingPeriods.length > 0,
      periods: remainingPeriods.length > 0 ? remainingPeriods : periods,
      message,
      nextOverlapMessage,
    };
  }, [irelandTime, settings.irelandSchedule, settings.puneSchedule, offsetInfo]);

  const messageIndicator = useMemo(() => {
    const puneStatus = puneInfo.status;
    const irelandStatus = irelandInfo.status;
    
    if (puneStatus === 'after-work') {
      return { text: 'Pune finished for today', type: 'warning' as const };
    }
    
    if (puneStatus === 'lunch') {
      return { text: 'Pune at lunch', type: 'info' as const };
    }
    
    if (puneStatus === 'before-work') {
      return { text: 'Pune not yet started', type: 'info' as const };
    }
    
    if (puneStatus === 'working' && irelandStatus === 'working') {
      // Check remaining overlap
      const currentIrelandMins = irelandTime.getHours() * 60 + irelandTime.getMinutes();
      const remainingPeriods = overlapInfo.periods.filter(p => parseTimeToMinutes(p.irelandEnd) > currentIrelandMins);
      
      if (remainingPeriods.length > 0) {
        const endMins = parseTimeToMinutes(remainingPeriods[0].irelandEnd);
        const remaining = endMins - currentIrelandMins;
        
        if (remaining <= 30) {
          return { text: `Limited overlap left, ${formatDuration(remaining)}`, type: 'warning' as const };
        }
      }
      
      return { text: 'Good time to message', type: 'success' as const };
    }
    
    return { text: 'Good time to message', type: 'success' as const };
  }, [puneInfo.status, irelandInfo.status, irelandTime, overlapInfo]);

  return {
    irelandInfo,
    puneInfo,
    offsetInfo,
    irelandProgress,
    puneProgress,
    overlapInfo,
    messageIndicator,
  };
};
