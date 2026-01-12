import { useSettings, WorkSchedule } from '@/contexts/SettingsContext';

interface ProgressBarProps {
  location: 'ireland' | 'pune';
  percentage: number;
  statusText: string;
  secondaryText: string;
  isBeforeWork: boolean;
  isAfterWork: boolean;
  lunchStartPercent: number;
  lunchEndPercent: number;
}

export const ProgressBar = ({
  location,
  percentage,
  statusText,
  secondaryText,
  isBeforeWork,
  isAfterWork,
  lunchStartPercent,
  lunchEndPercent,
}: ProgressBarProps) => {
  const { settings } = useSettings();
  const schedule = location === 'ireland' ? settings.irelandSchedule : settings.puneSchedule;
  const title = location === 'ireland' ? 'UKI Workday Progress' : 'Pune, India Workday Progress';

  return (
    <div className="w-full p-6 border border-border rounded-lg bg-card">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
        {title}
      </h3>
      
      {/* Progress bar container */}
      <div className="relative mb-4">
        {/* Labels */}
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>{schedule.startTime}</span>
          <span>{schedule.lunchStart} - {schedule.lunchEnd}</span>
          <span>{schedule.endTime}</span>
        </div>
        
        {/* Bar */}
        <div className="relative h-8 bg-secondary rounded-md overflow-hidden">
          {/* Lunch segment highlight */}
          <div
            className="absolute top-0 h-full bg-muted border-x border-border"
            style={{
              left: `${lunchStartPercent}%`,
              width: `${lunchEndPercent - lunchStartPercent}%`,
            }}
          />
          
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 h-full bg-foreground transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
          
          {/* Current time marker */}
          {!isBeforeWork && !isAfterWork && (
            <div
              className="absolute top-0 h-full w-0.5 bg-background"
              style={{ 
                left: `${percentage}%`,
                boxShadow: '0 0 4px hsl(var(--background))',
              }}
            />
          )}
        </div>
        
        {/* Marker indicators */}
        <div className="flex justify-between text-xs mt-1">
          <span className={isBeforeWork ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
            {isBeforeWork && '▼'}
          </span>
          <span className={isAfterWork ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
            {isAfterWork && '▼'}
          </span>
        </div>
      </div>
      
      {/* Status text */}
      <div className="text-center">
        <p className="text-lg font-semibold">{statusText}</p>
        {secondaryText && (
          <p className="text-sm text-muted-foreground mt-1">{secondaryText}</p>
        )}
      </div>
    </div>
  );
};
