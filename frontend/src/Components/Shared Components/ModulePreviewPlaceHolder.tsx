/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { moduleBackground, moduleBorderBrush } from '../../Resources/Colors';

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const ModulePreviewPlaceholder = ({ title, children }: Props) => {
  return (
    <div
      css={css`
        padding: 10px;
        width: 240px;
        height: 240px;
        border-style: solid;
        border-color: ${moduleBorderBrush};
        border-width: 0px;
        position: relative;
        :hover {
          padding: 8px;
          border-width: 2px;
        }
      `}
    >
      <div
        css={css`
          background-color: ${moduleBackground};
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
