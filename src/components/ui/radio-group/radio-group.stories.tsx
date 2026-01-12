import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../label/label';
import { RadioGroup, RadioGroupItem } from './radio-group';

/**
 * Radio Group component for mutually exclusive selections.
 * Built on Radix UI with keyboard navigation.
 */
const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic radio group */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};
