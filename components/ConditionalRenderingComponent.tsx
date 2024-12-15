import React from 'react';

type Props = {
  conditional: boolean;
  component: React.JSX.Element;
};

const ConditionalRenderingComponent: React.FC<Props> = (
  conditional,
  component,
) => conditional && component;

export default ConditionalRenderingComponent;
