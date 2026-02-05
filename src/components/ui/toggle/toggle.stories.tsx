import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic } from 'lucide-react';
import { Toggle } from './toggle';

/**
 * Toggle component for on/off states.
 * Built on Radix UI with variants and sizes.
 */
const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default toggle */
export const Default: Story = {
  args: {
    'aria-label': 'Toggle bold',
    children: <Bold className="h-4 w-4" />,
  },
};

/** Outline toggle variant */
export const Outline: Story = {
  args: {
    variant: 'outline',
    'aria-label': 'Toggle italic',
    children: <Italic className="h-4 w-4" />,
  },
};

/** Small size toggle */
export const Small: Story = {
  args: {
    size: 'sm',
    'aria-label': 'Toggle bold',
    children: <Bold className="h-4 w-4" />,
  },
};

/** Large size toggle */
export const Large: Story = {
  args: {
    size: 'lg',
    'aria-label': 'Toggle bold',
    children: <Bold className="h-4 w-4" />,
  },
};
