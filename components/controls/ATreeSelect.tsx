import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsDesktop } from '@utils/store';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
// Components
import { TreeSelect, TreeSelectProps } from 'antd';

const ATreeSelect: React.FC<TreeSelectProps> = props => {
  const isDesktop = useSelector(selectIsDesktop);

  const fullProps = {
    ...props,
    size: `${isDesktop ? 'large' : 'middle'}` as SizeType,
  };
  return <TreeSelect {...fullProps} />;
};

export default ATreeSelect;
