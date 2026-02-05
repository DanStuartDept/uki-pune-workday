import type { Meta, StoryObj } from '@storybook/react-vite';
import { Terminal, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './alert';

/**
 * Alert component displays important messages to users with different visual styles.
 * It supports two variants (default and destructive) and can include icons, titles, and descriptions.
 * The component follows WCAG accessibility standards with proper ARIA roles.
 */
const meta = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default alert variant with icon, title, and description */
export const Default: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

/** Destructive variant used for error messages */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

/** Alert with only a title */
export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>System Update Available</AlertTitle>
    </Alert>
  ),
};

/** Alert without an icon */
export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an alert without an icon.
      </AlertDescription>
    </Alert>
  ),
};
