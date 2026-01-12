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

/**
 * Displays a status message banner indicating messaging availability
 * @param text - Message text to display
 * @param type - Message type determining the color scheme
 */
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
