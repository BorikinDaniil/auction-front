import React from 'react';
import {
  LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined,
} from '@ant-design/icons';
import { StepProps, Steps } from 'antd';

const AuctionSteps: React.FC = () => {
  const [items, setItems] = React.useState<StepProps[]>([
    {
      title: 'Description',
      status: 'process',
      icon: <UserOutlined />,
    },
    {
      title: 'Categories',
      status: 'wait',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Media',
      status: 'wait',
      icon: <LoadingOutlined />,
    },
    {
      title: 'Done',
      status: 'wait',
      icon: <SmileOutlined />,
    },
  ]);

  return (
    <Steps
      items={items}
    />
  );
};

export default AuctionSteps;
