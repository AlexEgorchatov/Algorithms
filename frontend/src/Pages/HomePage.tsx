/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ModuleList } from '../Module Resources/ModuleList';
import { modules } from '../Module Resources/ModuleData';

export const HomePage = () => (
  <div
    css={css`
      display: block;
      overflow: auto;
      min-height: 87vh;
    `}
  >
    <div
      css={css`
        color: #f5c81a;
        font-size: 48px;
        text-align: center;
      `}
    >
      Welcome to the Algorithms project!
    </div>
    <ModuleList data={modules} />
  </div>
);
