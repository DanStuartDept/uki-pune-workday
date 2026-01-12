interface OverlapPeriod {
  irelandStart: string;
  irelandEnd: string;
  puneStart: string;
  puneEnd: string;
}

interface OverlapIndicatorProps {
  hasOverlap: boolean;
  periods: OverlapPeriod[];
  message: string;
  nextOverlapMessage?: string;
}

/**
 * Displays timezone overlap periods between UKI and Pune work hours
 * @param hasOverlap - Whether there is remaining overlap today
 * @param periods - Array of overlap time periods
 * @param message - Primary message about overlap status
 * @param nextOverlapMessage - Optional message about next overlap
 */
export const OverlapIndicator = ({
  hasOverlap,
  periods,
  message,
  nextOverlapMessage,
}: OverlapIndicatorProps) => {
  return (
    <div className="w-full p-6 border border-border rounded-lg bg-card">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
        {message}
      </h3>
      
      {periods.length > 0 ? (
        <div className="space-y-3">
          {periods.map((period, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">UKI</p>
                <p className="text-lg font-semibold tabular-nums">
                  {period.irelandStart} – {period.irelandEnd}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Pune, India</p>
                <p className="text-lg font-semibold tabular-nums">
                  {period.puneStart} – {period.puneEnd}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No overlap windows available</p>
      )}
      
      {nextOverlapMessage && (
        <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
          {nextOverlapMessage}
        </p>
      )}
    </div>
  );
};
