import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

/**
 * Avatar component for displaying user profile images.
 * Built on Radix UI with fallback support.
 */
const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Avatar with image */
export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/** Avatar fallback (when image fails to load) */
export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="invalid-url" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};
