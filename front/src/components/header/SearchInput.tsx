import * as React from 'react';
import * as css from 'styles/theme';
import styled from 'styled-components';
import search from 'public/static/images/svg/search2.svg';

const SearchInput: React.FC = () => {
  return (
    <Container>
      <Label htmlFor='searchInput'>
        <Icon url={search} />
      </Label>
      <InputBox>
        <Input id='searchInput' type='text' placeholder={'검색'} />
      </InputBox>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  width: 215px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  padding: 2px;
  overflow: hidden;
  background-color: ${(props) => props.theme.tableHeader};
`;
const Label = styled.label`
  ${css.flexCenter}
  position: relative;
`;

const Icon = styled.div<{ url: string }>`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  margin: 6px 8px;
  height: ${3 * css.unit + 'px'};
  width: ${3 * css.unit + 'px'};
  background-color: ${(props) => props.theme.secondaryText};
  mask-image: url('${({ url }) => url}');
`;

// const Icon = styled.img`
//   z-index: 1;
//   position:absolute;
//   left: 0;
//   top: 0;
//   margin :  6px 8px;
//   height: ${3 * css.unit + 'px'};
//   width: ${3 * css.unit + 'px'};
//   }
// `;

const InputBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Input = styled.input`
  ${css.font}
  font-size: 12px;
  width: 83%;
  padding: 5px 7px;
  position: relative;
  outline: none;
  border: none;
  color: ${(props) => props.theme.primaryText};
  background-color: rgba(0, 0, 0, 0);
  &::placeholder {
    text-align: center;
    color: ${(props) => props.theme.secondaryText};
  }
  &:active,
  &:focus {
    &::placeholder {
      position: relative;
      text-align: left;
    }
  }
`;

export default SearchInput;
