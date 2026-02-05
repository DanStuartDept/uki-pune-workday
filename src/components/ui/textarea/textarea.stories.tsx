import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './textarea';

/**
 * Textarea component for multi-line text input.
 * Supports all native HTML textarea attributes.
 */
const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default textarea */
export const Default: Story = {
  args: { placeholder: 'Type your message here...' },
};

/** Disabled textarea */
export const Disabled: Story = {
  args: { placeholder: 'Disabled', disabled: true },
};

/** Textarea with default value */
export const WithValue: Story = {
  args: { 
    defaultValue: 'This is a default value in the textarea.',
  },
};
