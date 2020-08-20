import React from 'react';
import styled from 'styled-components';
import {
  GithubOutlined,
  YoutubeFilled,
  BoldOutlined,
  MailOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { flexCenter } from '../styles/theme';

const Footer = () => {
  return (
    <Container>
      <CenterBox>
        <div>
          <p>2020.08.01 - 2020.08.31</p>
        </div>
        <div>
          <SNSBox>
            <li>
              <BoldOutlined />
            </li>
            <li>
              <GithubOutlined />
            </li>
            <li>
              {/* <MailOutlined /> */}
              <GoogleOutlined />
            </li>
            <li>
              <YoutubeFilled />
            </li>
          </SNSBox>
        </div>
      </CenterBox>
    </Container>
  );
};

const Container = styled.div`
  ${flexCenter}
  color: ${(props) => props.theme.title};
  border-top: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.border};
  p {
    padding-bottom: 10px;
    &:last-child {
      padding: 0px;
    }
  }
`;
const CenterBox = styled.div`
  ${flexCenter}
  width: ${(props) => props.theme.response.web + 'px'};
  justify-content: space-between;
  padding: 20px 0;
  border-right: 1px solid ${(props) => props.theme.border};
  border-left: 1px solid ${(props) => props.theme.border};
`;
const SNSBox = styled.ul`
  display: flex;
  li {
    padding-right: 20px;
    &:last-child {
      padding-right: 0px;
    }
  }
`;

export default Footer;
