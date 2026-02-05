import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './progress';

/**
 * Progress component for showing completion status.
 * Displays a progress bar with animated value.
 */
const meta = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Progress at 0% */
export const Zero: Story = {
  args: { value: 0, className: 'w-[60%]' },
};

/** Progress at 50% */
export const Half: Story = {
  args: { value: 50, className: 'w-[60%]' },
};

/** Progress at 100% */
export const Complete: Story = {
  args: { value: 100, className: 'w-[60%]' },
};
