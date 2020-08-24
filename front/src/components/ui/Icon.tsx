import React from 'react';
import styled from 'styled-components';
import { unit } from 'src/styles/theme';

const Icon = ({ url }) => {
  return <Image src={url} />;
};

const Image = styled.img`
  display: block;
  height: ${6 * unit + 'px'};
  width: ${6 * unit + 'px'};
  /* margin: 9px; */
`;

export default Icon;
