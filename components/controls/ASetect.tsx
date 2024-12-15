import React from 'react';
// Store
import { useSelector } from 'react-redux';
import { selectIsDesktop } from '@utils/store';
// Types
import { SizeType } from 'antd/lib/config-provider/SizeContext';
// Components
import { Select, SelectProps } from 'antd';

const ASelect: React.FC<SelectProps> = props => {
  const isDesktop = useSelector(selectIsDesktop);

  const fullProps = {
    ...props,
    size: `${isDesktop ? 'large' : 'middle'}` as SizeType,
  };
  return <Select {...fullProps} />;
};

export default ASelect;
