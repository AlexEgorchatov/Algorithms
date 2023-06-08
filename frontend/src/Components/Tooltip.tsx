/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface Props {
  text: string;
}

export const Tooltip = ({ text }: Props) => {
  return (
    <span
      css={css`
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: white;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -60px;
        font-size: 14px;
        ::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: black transparent transparent transparent;
        }
      `}
    >
      {text}
    </span>
  );
};
