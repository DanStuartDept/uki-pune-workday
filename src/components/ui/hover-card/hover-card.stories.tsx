import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

/**
 * Hover Card component for displaying rich content on hover.
 * Built on Radix UI with positioning.
 */
const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic hover card */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework for the Web.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
