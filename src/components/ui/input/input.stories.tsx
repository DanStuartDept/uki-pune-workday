import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

/**
 * Input component for text entry.
 * Supports all native HTML input types and states.
 */
const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default text input */
export const Default: Story = {
  args: { placeholder: 'Enter text...' },
};

/** Email input type */
export const Email: Story = {
  args: { type: 'email', placeholder: 'Email' },
};

/** Password input type */
export const Password: Story = {
  args: { type: 'password', placeholder: 'Password' },
};

/** Disabled input state */
export const Disabled: Story = {
  args: { placeholder: 'Disabled', disabled: true },
};
