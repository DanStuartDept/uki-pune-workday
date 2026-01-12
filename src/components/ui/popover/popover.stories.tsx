import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

/**
 * Popover component for displaying content in a floating panel.
 * Built on Radix UI with positioning logic.
 */
const meta = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic popover */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
