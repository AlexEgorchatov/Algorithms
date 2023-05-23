/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const Header = () => {
  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        min-width: 450px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
        background-color: #222222;
        z-index: 999;
      `}
    >
      <div>
        <a
          css={css`
            font-size: 36px;
            text-decoration: none;
            color: #f5c81a;
            vertical-align: super;
            margin-right: 10px;
          `}
          href="./"
        >
          Home
        </a>
        <select
          css={css`
            color: #f5c81a;
            background-color: transparent;
            border-color: transparent;
            font-size: 24px;
            margin-right: 10px;
            vertical-align: super;
          `}
        >
          <option>Module 1</option>
          <option>Module 2</option>
        </select>
        <a
          css={css`
            font-size: 24px;
            text-decoration: none;
            color: #f5c81a;
            vertical-align: super;
          `}
          href="#"
        >
          About
        </a>
      </div>
      <a
        css={css`
          text-decoration: none;
          color: #f5c81a;
          vertical-align: super;
        `}
        href="#"
      >
        Sign In
      </a>
    </div>
  );
};
