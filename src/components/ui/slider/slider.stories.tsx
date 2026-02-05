import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './slider';

/**
 * Slider component for selecting a value from a range.
 * Built on Radix UI with keyboard support.
 */
const meta = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default slider */
export const Default: Story = {
  args: { 
    defaultValue: [50],
    max: 100,
    step: 1,
    className: 'w-[60%]',
  },
};

/** Slider with range */
export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    className: 'w-[60%]',
  },
};
