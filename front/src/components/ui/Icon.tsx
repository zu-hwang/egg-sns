import * as React from 'react';
import styled from 'styled-components';
import { unit } from 'styles/theme';

interface IconProps {
  url: string;
}

const Icon: React.FC<IconProps> = ({ url }) => {
  return <Image src={url} />;
};

const Image = styled.img`
  display: block;
  height: ${6 * unit + 'px'};
  width: ${6 * unit + 'px'};
  /* margin: 9px; */
`;

export default Icon;
