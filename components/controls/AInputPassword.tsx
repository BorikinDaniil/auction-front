import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsDesktop } from '@utils/store';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
// Components
import { Input, InputProps } from 'antd';

const AInputPassword: React.FC<InputProps> = props => {
  const isDesktop = useSelector(selectIsDesktop);

  const fullProps = {
    ...props,
    size: `${isDesktop ? 'large' : 'middle'}` as SizeType,
  };
  return <Input.Password {...fullProps} />;
};

export default AInputPassword;
