/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered } from '../Resources/Colors';
import { isTouchDevice } from '../Core/Helper';

export const CloseButton = () => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        position: relative;
        display: block;
        transform: scale(var(--ggs, 1));
        width: 22px;
        height: 22px;
        border: 2px solid transparent;
        border-radius: 40px;
        ${!isTouchDevice &&
        `
          cursor: pointer;
          :hover {
            color: ${headerItemHovered};
          }
        `};
        ::after,
        ::before {
          content: '';
          display: block;
          box-sizing: border-box;
          position: absolute;
          width: 18px;
          height: 2px;
          background: currentColor;
          transform: rotate(45deg);
          border-radius: 5px;
          top: 8px;
          left: 0px;
        }
        ::after {
          transform: rotate(-45deg);
        }
      `}
    ></div>
  );
};
