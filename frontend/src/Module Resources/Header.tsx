/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mainBackground, mainFontColor } from '../Styles/Styles';
import { ModuleData } from './ModuleData';
import { Link } from 'react-router-dom';

interface Props {
  data: ModuleData[];
}

export const Header = ({ data }: Props) => {
  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        min-width: 460px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
        background-color: ${mainBackground};
        z-index: 999;
      `}
    >
      <div>
        <Link
          css={css`
            font-size: 28px;
            text-decoration: none;
            color: ${mainFontColor};
            vertical-align: super;
            margin-right: 10px;
            cursor: hand;
          `}
          to=""
          style={{ textDecoration: 'none' }}
          reloadDocument={true}
        >
          Home
        </Link>
        <div
          css={css`
            position: relative;
            display: inline-block;
            vertical-align: super;
            margin-right: 10px;
            :hover {
              & > div {
                display: block;
              }
            }
          `}
        >
          <button
            css={css`
              background-color: transparent;
              color: ${mainFontColor};
              font-size: 28px;
              border: none;
              cursor: pointer;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
                'Droid Sans', 'Helvetica Neue', sans-serif;
            `}
          >
            Modules
          </button>
          <div
            css={css`
              display: none;
              position: absolute;
              background-color: #f1f1f1;
              min-width: 140px;
              z-index: 1;
            `}
          >
            {data.map((item, index) => (
              <Link
                css={css`
                  color: black;
                  padding: 12px 16px;
                  text-decoration: none;
                  display: block;
                  :hover {
                    background-color: #ddd;
                  }
                `}
                key={index}
                to={item.link}
                style={{ textDecoration: 'none' }}
                reloadDocument={true}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <a
          css={css`
            font-size: 28px;
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
          font-size: 18px;
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
