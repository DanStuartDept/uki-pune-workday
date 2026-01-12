import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './switch';
import { Label } from '../label/label';

/**
 * Switch component for toggle controls.
 * Built on Radix UI with smooth animations.
 */
const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default unchecked switch */
export const Default: Story = {
  args: {},
};

/** Checked switch */
export const Checked: Story = {
  args: { defaultChecked: true },
};

/** Disabled switch */
export const Disabled: Story = {
  args: { disabled: true },
};

/** Switch with associated label */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane Mode</Label>
    </div>
  ),
};
