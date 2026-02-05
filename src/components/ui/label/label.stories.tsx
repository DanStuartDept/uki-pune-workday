import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';

/**
 * Label component for form field labels.
 * Should be associated with form controls using htmlFor prop.
 */
const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default label */
export const Default: Story = {
  args: { children: 'Label' },
};

/** Label associated with input using htmlFor */
export const HtmlFor: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" className="border rounded px-2 py-1" />
    </div>
  ),
};
