/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ModuleList } from '../Module Resources/ModuleList';
import { modules } from '../Module Resources/ModuleData';

export const HomePage = () => (
  <React.Fragment>
    <div
      css={css`
        color: #f5c81a;
        font-size: 48px;
        text-align: center;
      `}
    >
      Welcome to the Algorithms project!
    </div>
    <div
      css={css`
        margin: 20px 10px 0px 10px;
        background-color: #444444;
        display: block;
        overflow: auto;
        min-height: 87vh;
      `}
    >
      <ModuleList data={modules} />
    </div>
  </React.Fragment>
);
