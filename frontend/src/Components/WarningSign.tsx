/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const WarningSignComponent = () => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        display: block;
        transform: scale(var(--ggs, 1));
        min-width: 20px;
        height: 20px;
        border: 2px solid;
        border-radius: 40px;
        ::before,
        ::after {
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          border-radius: 3px;
          width: 2px;
          background: currentColor;
          left: 7px;
        }
        ::after {
          top: 2px;
          height: 8px;
        }
        ::before {
          height: 2px;
          bottom: 2px;
        }
      `}
    ></div>
  );
};
