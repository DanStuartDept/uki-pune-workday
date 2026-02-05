import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './context-menu';

/**
 * Context Menu component for right-click menus.
 * Built on Radix UI with keyboard navigation.
 */
const meta = {
  title: 'UI/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic context menu */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
