import { SettingsProvider } from '@/contexts/SettingsContext';
import { useTimezone } from '@/hooks/useTimezone';
import { TimeCard } from '@/components/TimeCard';
import { ProgressBar } from '@/components/ProgressBar';
import { OverlapIndicator } from '@/components/OverlapIndicator';
import { MessageIndicator } from '@/components/MessageIndicator';
import { SettingsPanel } from '@/components/SettingsPanel';

const Dashboard = () => {
  const {
    irelandInfo,
    puneInfo,
    offsetInfo,
    irelandProgress,
    puneProgress,
    overlapInfo,
    messageIndicator,
  } = useTimezone();

  return (
    <div className="min-h-screen bg-background p-8">
      <SettingsPanel />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-2">Timezone Glance</h1>
          <p className="text-muted-foreground">{offsetInfo.text}</p>
        </header>

        {/* Time Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <TimeCard
            location="UKI"
            time={irelandInfo.formattedTime}
            date={irelandInfo.formattedDate}
            dayIndicator={irelandInfo.dayIndicator}
            status={irelandInfo.status}
          />
          <TimeCard
            location="PUNE, INDIA"
            time={puneInfo.formattedTime}
            date={puneInfo.formattedDate}
            dayIndicator={puneInfo.dayIndicator}
            status={puneInfo.status}
          />
        </div>

        {/* Message Indicator */}
        <MessageIndicator text={messageIndicator.text} type={messageIndicator.type} />

        {/* Progress Bars */}
        <ProgressBar
          location="ireland"
          percentage={irelandProgress.percentage}
          statusText={irelandProgress.statusText}
          secondaryText={irelandProgress.secondaryText}
          isBeforeWork={irelandProgress.isBeforeWork}
          isAfterWork={irelandProgress.isAfterWork}
          lunchStartPercent={irelandProgress.lunchStartPercent}
          lunchEndPercent={irelandProgress.lunchEndPercent}
        />
        <ProgressBar
          location="pune"
          percentage={puneProgress.percentage}
          statusText={puneProgress.statusText}
          secondaryText={puneProgress.secondaryText}
          isBeforeWork={puneProgress.isBeforeWork}
          isAfterWork={puneProgress.isAfterWork}
          lunchStartPercent={puneProgress.lunchStartPercent}
          lunchEndPercent={puneProgress.lunchEndPercent}
        />

        {/* Overlap Indicator */}
        <OverlapIndicator
          hasOverlap={overlapInfo.hasOverlap}
          periods={overlapInfo.periods}
          message={overlapInfo.message}
          nextOverlapMessage={overlapInfo.nextOverlapMessage}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <SettingsProvider>
      <Dashboard />
    </SettingsProvider>
  );
};

export default Index;
