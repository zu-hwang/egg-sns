import React from 'react';
import styled from 'styled-components';

export default ({}) => {
  return (
    <Container isActive age={20}>
      해더입니당
    </Container>
  );
};

// 스타일드-컴포넌트 타입지정
// 1. 여러개의 프롭스를 사용한다면 (여러개 타입지정시)
interface Container {
  isActive: boolean;
  age: number;
}
const Container = styled.div<Container>`
  color: ${(props) => (props.age > 20 ? 'red' : 'gray')};
  background-color: ${(props) => (props.isActive ? 'red' : 'gray')};
`;
