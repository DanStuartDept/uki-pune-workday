import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

/**
 * Card component for grouping related content.
 * Consists of Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter.
 */
const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic card with header and content */
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  ),
};

/** Card with all sections including footer */
export const WithFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Project configuration goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};
