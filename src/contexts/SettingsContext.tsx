import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Work schedule configuration for a location
 */
export interface WorkSchedule {
  startTime: string;
  lunchStart: string;
  lunchEnd: string;
  endTime: string;
}

/**
 * Application settings configuration
 */
export interface Settings {
  irelandSchedule: WorkSchedule;
  puneSchedule: WorkSchedule;
  use24Hour: boolean;
  showSeconds: boolean;
  theme: 'light' | 'dark' | 'system';
  updateFrequency: 'standard' | 'smooth';
}

const defaultSettings: Settings = {
  irelandSchedule: {
    startTime: '09:00',
    lunchStart: '13:00',
    lunchEnd: '14:00',
    endTime: '17:30',
  },
  puneSchedule: {
    startTime: '12:00',
    lunchStart: '16:00',
    lunchEnd: '17:00',
    endTime: '21:00',
  },
  use24Hour: true,
  showSeconds: false,
  theme: 'light',
  updateFrequency: 'standard',
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  updateIrelandSchedule: (schedule: Partial<WorkSchedule>) => void;
  updatePuneSchedule: (schedule: Partial<WorkSchedule>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * Settings context provider that manages application settings with localStorage persistence
 * @param children - React children to be wrapped by the provider
 */
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem('timezone-glance-settings');
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('timezone-glance-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (settings.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(settings.theme);
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateIrelandSchedule = (schedule: Partial<WorkSchedule>) => {
    setSettings(prev => ({
      ...prev,
      irelandSchedule: { ...prev.irelandSchedule, ...schedule },
    }));
  };

  const updatePuneSchedule = (schedule: Partial<WorkSchedule>) => {
    setSettings(prev => ({
      ...prev,
      puneSchedule: { ...prev.puneSchedule, ...schedule },
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateIrelandSchedule, updatePuneSchedule }}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
