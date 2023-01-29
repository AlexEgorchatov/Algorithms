/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
  isGrid?: boolean;
}

export const ModulePlaceholder = ({ title, children, isGrid = false }: Props) => {
  return (
    <div
      css={css`
        padding: 10px;
        width: 240px;
        height: 240px;
        border-style: solid;
        border-color: #e8610e;
        border-width: 0px;
        position: relative;
        cursor: pointer;
        :hover {
          padding: 8px;
          border-width: 2px;
        }
      `}
    >
      <div
        css={css`
          background-color: #777777;
          height: 210px;
        `}
      >
        {children}
      </div>
      <div
        css={css`
          font-size: 24px;
          color: #ffffff;
          text-align: center;
        `}
      >
        {title}
      </div>
    </div>
  );
};
