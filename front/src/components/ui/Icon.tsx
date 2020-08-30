import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';

interface IconProps {
  url: string;
}

const Icon: React.FC<IconProps> = ({ url }) => {
  return <Image src={url} />;
};

const Image = styled.img`
  display: block;
  height: ${6 * css.unit + 'px'};
  width: ${6 * css.unit + 'px'};
  /* margin: 9px; */
`;

export default Icon;
