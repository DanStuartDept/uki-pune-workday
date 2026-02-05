import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';

/**
 * Badge component for displaying status, labels, or counts.
 * Supports multiple variants for different contextual meanings.
 */
const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Primary badge variant */
export const Default: Story = {
  args: { children: 'Badge' },
};

/** Secondary badge for less prominent labels */
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

/** Destructive badge for errors or warnings */
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

/** Outline badge with border */
export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};
