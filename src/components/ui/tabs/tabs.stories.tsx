import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

/**
 * Tabs component for organizing content into sections.
 * Built on Radix UI with keyboard navigation.
 */
const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic tabs with three panels */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm">Account settings content</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm">Password settings content</p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm">General settings content</p>
      </TabsContent>
    </Tabs>
  ),
};
