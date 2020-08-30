import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
  }
  body, h1, h2, h3, h4, h5, h6, p, span, div, article, nav ,input, label,button {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  /* @media only screen and (max-width: 768px) {
    body {
      font-size: 12px;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      font-size: 10px;
    }
  } */
`;
