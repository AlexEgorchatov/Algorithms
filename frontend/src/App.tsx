/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { HomePage } from './Pages/HomePage';

function App() {
  return (
    <div
      css={css`
        margin: 0px;
        background-color: #222222;
        min-height: 100vh;
      `}
    >
      <HomePage />
      <div
        css={css`
          margin: 10px;
          color: #f5c81a;
          text-align: end;
        `}
      >
        Made by Alex Egorchatov, 2022
      </div>
    </div>
  );
}

export default App;
