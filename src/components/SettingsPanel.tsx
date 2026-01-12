import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { useSettings, WorkSchedule } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ScheduleEditor = ({
  title,
  schedule,
  onUpdate,
}: {
  title: string;
  schedule: WorkSchedule;
  onUpdate: (schedule: Partial<WorkSchedule>) => void;
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold uppercase tracking-wide">{title}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${title}-start`} className="text-xs">Start Time</Label>
          <Input
            id={`${title}-start`}
            type="time"
            value={schedule.startTime}
            onChange={(e) => onUpdate({ startTime: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${title}-end`} className="text-xs">End Time</Label>
          <Input
            id={`${title}-end`}
            type="time"
            value={schedule.endTime}
            onChange={(e) => onUpdate({ endTime: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${title}-lunch-start`} className="text-xs">Lunch Start</Label>
          <Input
            id={`${title}-lunch-start`}
            type="time"
            value={schedule.lunchStart}
            onChange={(e) => onUpdate({ lunchStart: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${title}-lunch-end`} className="text-xs">Lunch End</Label>
          <Input
            id={`${title}-lunch-end`}
            type="time"
            value={schedule.lunchEnd}
            onChange={(e) => onUpdate({ lunchEnd: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export const SettingsPanel = () => {
  const { settings, updateSettings, updateIrelandSchedule, updatePuneSchedule } = useSettings();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4" aria-label="Open settings">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="uppercase">Settings</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-8">
          {/* Work Schedules */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Work Schedules
            </h3>
            <ScheduleEditor
              title="Ireland"
              schedule={settings.irelandSchedule}
              onUpdate={updateIrelandSchedule}
            />
            <ScheduleEditor
              title="Pune"
              schedule={settings.puneSchedule}
              onUpdate={updatePuneSchedule}
            />
          </div>
          
          {/* Display Settings */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Display
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="use24Hour" className="text-sm">24-Hour Format</Label>
              <Switch
                id="use24Hour"
                checked={settings.use24Hour}
                onCheckedChange={(checked) => updateSettings({ use24Hour: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="showSeconds" className="text-sm">Show Seconds</Label>
              <Switch
                id="showSeconds"
                checked={settings.showSeconds}
                onCheckedChange={(checked) => updateSettings({ showSeconds: checked })}
              />
            </div>
          </div>
          
          {/* Theme */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Theme
            </h3>
            <Select
              value={settings.theme}
              onValueChange={(value: 'light' | 'dark' | 'system') => updateSettings({ theme: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Update Frequency */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Update Frequency
            </h3>
            <Select
              value={settings.updateFrequency}
              onValueChange={(value: 'standard' | 'smooth') => updateSettings({ updateFrequency: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (every minute)</SelectItem>
                <SelectItem value="smooth">Smooth (every second)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
