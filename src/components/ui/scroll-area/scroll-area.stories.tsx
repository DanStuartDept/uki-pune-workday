import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '../separator/separator';
import { ScrollArea } from './scroll-area';

/**
 * Scroll Area component for custom scrollable regions.
 * Built on Radix UI with styled scrollbars.
 */
const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Vertical scroll area */
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>
            <div className="text-sm">Tag {i + 1}</div>
            {i < 49 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
