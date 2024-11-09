import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsDesktop } from '@utils/store';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
// Components
import { InputNumber, InputNumberProps } from 'antd';

const AInputNumber: React.FC<InputNumberProps> = props => {
  const isDesktop = useSelector(selectIsDesktop);

  const fullProps = {
    ...props,
    size: `${isDesktop ? 'large' : 'middle'}` as SizeType,
  };
  return <InputNumber {...fullProps} />;
};

export default AInputNumber;
