import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsDesktop } from '@utils/store';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { RangePickerProps } from '@Types/form';
// Components
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const ARangePicker: React.FC<RangePickerProps> = props => {
  const isDesktop = useSelector(selectIsDesktop);

  const fullProps = {
    ...props,
    size: `${isDesktop ? 'large' : 'middle'}` as SizeType,
  };
  return <RangePicker {...fullProps} />;
};

export default ARangePicker;
