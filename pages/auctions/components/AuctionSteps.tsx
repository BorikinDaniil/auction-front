import React from 'react';
// Components
import {
  FileImageOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { StepProps, Steps } from 'antd';

type StepsProps = {
  current: number
}

const items = [
  {
    title: 'Description',
    icon: <UserOutlined />,
  },
  {
    title: 'Categories',
    icon: <SolutionOutlined />,
  },
  {
    title: 'Media',
    icon: <FileImageOutlined />,
  },
] as StepProps[];

const AuctionSteps: React.FC<StepsProps> = ({ current }) => {

  return (
    <div className="mb-12">
      <Steps
        items={items}
        current={current}
      />
    </div>
  );
};

export default AuctionSteps;
