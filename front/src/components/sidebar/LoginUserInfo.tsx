import * as React from 'react';
import * as css from 'styles/theme';
import * as redux from 'src/hooks/customRedux';
import styled from 'styled-components';
import Avatar from 'src/components/ui/Avatar';
import UserNameBox from 'src/components/ui/UserNameBox';

// export interface User {
//   id: number;
//   userName: string;
//   email: string | null;
//   phoneNumber: string | null;
//   fullName: string;
//   imageUrl: string | null;
//   content: string | null;
//   secretMode: boolean;
// }
const LoginUserInfo: React.FC = () => {
  const user = redux.useSelector((s) => s.account.user);

  return (
    <Container>
      {user !== null && user.imageUrl !== undefined && (
        <Avatar url={user.imageUrl} />
      )}
      {user !== null && (
        <UserNameBox username={user.userName} content={user.content} />
      )}
    </Container>
  );
};
const Container = styled.div`
  ${css.flexCenter}
  justify-content:flex-start;
  /* border: 1px solid tomato; */
  width: 100%;
  padding: 16px 0;
`;

export default LoginUserInfo;
