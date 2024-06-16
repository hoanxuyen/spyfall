import type { Meta, StoryObj } from '@storybook/react';
import TextAnimation from '../components/TextAnimation';

const meta = {
    title: "Components/TextAnimation",
    component: TextAnimation
} satisfies Meta<typeof TextAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vulputate lacinia consequat. In tempus diam tellus, vitae feugiat diam tristique vel. Nam efficitur feugiat augue vel euismod. Curabitur hendrerit euismod nulla et rhoncus. Phasellus vestibulum nisl in nibh dictum, vitae vehicula lectus euismod.',
        className: ''
    }
}