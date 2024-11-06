import React, {ReactElement} from 'react';
import { useSelector } from 'react-redux';
import { selectIsDesktop } from '@utils/store';

type Props = {
  // TODO: Remove any
  children:  ReactElement<any, any>;
}

export const AutoResizeWrapper = (props: Props) => {
  const isDesktop = useSelector(selectIsDesktop);

  const Component = props.children;

  return React.cloneElement(Component, {
    size: `${isDesktop ? 'large' : 'middle'}`,
  });
};

export default AutoResizeWrapper;
