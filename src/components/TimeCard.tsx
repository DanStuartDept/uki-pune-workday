import { WorkStatus } from '@/hooks/useTimezone';
import { cn } from '@/lib/utils';

interface TimeCardProps {
  location: string;
  time: string;
  date: string;
  dayIndicator: string;
  status: WorkStatus;
}

const statusConfig: Record<WorkStatus, { label: string; className: string }> = {
  'before-work': { label: 'Before Work', className: 'bg-muted text-muted-foreground' },
  'working': { label: 'Working', className: 'bg-success text-success-foreground' },
  'lunch': { label: 'Lunch', className: 'bg-warning text-warning-foreground' },
  'after-work': { label: 'After Work', className: 'bg-muted text-muted-foreground' },
};

export const TimeCard = ({ location, time, date, dayIndicator, status }: TimeCardProps) => {
  const statusInfo = statusConfig[status];

  return (
    <div className="flex flex-col items-center p-8 border border-border rounded-lg bg-card">
      <h2 className="text-sm font-medium text-muted-foreground mb-2">{location}</h2>
      <div className="text-6xl font-black tabular-nums tracking-tight mb-2">
        {time}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <span className="font-medium">{dayIndicator}</span>
        <span>·</span>
        <span>{date}</span>
      </div>
      <div className={cn(
        'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        statusInfo.className
      )}>
        {statusInfo.label}
      </div>
    </div>
  );
};
