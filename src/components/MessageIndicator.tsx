import { cn } from '@/lib/utils';

interface MessageIndicatorProps {
  text: string;
  type: 'success' | 'warning' | 'info';
}

const typeStyles = {
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  info: 'bg-muted text-muted-foreground',
};

export const MessageIndicator = ({ text, type }: MessageIndicatorProps) => {
  return (
    <div className={cn(
      'w-full py-4 px-6 rounded-lg text-center font-semibold uppercase tracking-wide',
      typeStyles[type]
    )}>
      {text}
    </div>
  );
};
