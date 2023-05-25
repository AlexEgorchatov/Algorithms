/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mainBackground, mainFontColor } from '../Styles/Styles';

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
        background-color: ${mainBackground};
        z-index: 999;
      `}
    >
      <div>
        <a
          css={css`
            font-size: 36px;
            text-decoration: none;
            color: ${mainFontColor};
            vertical-align: super;
            margin-right: 10px;
          `}
          href="./"
        >
          Home
        </a>
        <select
          css={css`
            color: ${mainFontColor};
            background-color: transparent;
            border-color: transparent;
            font-size: 36px;
            margin-right: 10px;
            vertical-align: super;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
              'Droid Sans', 'Helvetica Neue', sans-serif;
          `}
        >
          <option>Module 1</option>
          <option>Module 2</option>
        </select>
        <a
          css={css`
            font-size: 36px;
            text-decoration: none;
            color: ${mainFontColor};
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
          color: ${mainFontColor};
          vertical-align: super;
        `}
        href="#"
      >
        Sign In
      </a>
    </div>
  );
};
