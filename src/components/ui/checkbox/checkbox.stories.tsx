import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';
import { Label } from '../label/label';

/**
 * Checkbox component for binary choices.
 * Built on Radix UI with accessible keyboard navigation.
 */
const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default unchecked checkbox */
export const Default: Story = {
  args: {},
};

/** Checked checkbox */
export const Checked: Story = {
  args: { defaultChecked: true },
};

/** Disabled checkbox */
export const Disabled: Story = {
  args: { disabled: true },
};

/** Checkbox with associated label */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};
