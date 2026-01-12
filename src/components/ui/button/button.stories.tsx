import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Loader2, ChevronRight } from 'lucide-react';
import { Button } from './button';

/**
 * Button component for user interactions.
 * Supports multiple variants, sizes, and can render as any element using asChild.
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Primary button variant */
export const Default: Story = {
  args: { children: 'Button' },
};

/** Secondary button for less prominent actions */
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

/** Destructive button for dangerous actions */
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

/** Outline button with border */
export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

/** Ghost button with minimal styling */
export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

/** Link styled button */
export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

/** Small button size */
export const Small: Story = {
  args: { size: 'sm', children: 'Small Button' },
};

/** Large button size */
export const Large: Story = {
  args: { size: 'lg', children: 'Large Button' },
};

/** Icon-only button */
export const Icon: Story = {
  args: { 
    size: 'icon', 
    'aria-label': 'Next',
    children: <ChevronRight />,
  },
};

/** Button with icon and text */
export const WithIcon: Story = {
  render: () => (
    <Button>
      <Mail />
      Login with Email
    </Button>
  ),
};

/** Loading button state */
export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  ),
};

/** Button rendered as link using asChild */
export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="/">Link Button</a>
    </Button>
  ),
};
