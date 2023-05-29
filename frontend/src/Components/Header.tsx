/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered, mainBackground, mainFontColor } from '../Resources/Colors';
import { ModuleData } from '../Resources/Module Resources/ModuleData';
import { Link } from 'react-router-dom';

interface Props {
  data: ModuleData[];
}

const HeaderStyle = css`
  font-size: 28px;
  text-decoration: none;
  color: ${mainFontColor};
  vertical-align: super;
  background-color: transparent;
  :hover {
    color: ${headerItemHovered};
  }
`;

const HeaderMenuButton = () => {
  return (
    <div
      css={css`
        &,
        &::after,
        &::before {
          box-sizing: border-box;
          position: relative;
          width: 25px;
          height: 2px;
          border-radius: 3px;
          color: ${mainFontColor};
          background: currentColor;
        }
        &::after,
        &::before {
          content: '';
          position: absolute;
          top: -8px;
        }
        &::after {
          top: 8px;
        }
      `}
    ></div>
  );
};

export const Header = ({ data }: Props) => {
  return (
    <div
      css={css`
        position: fixed;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        height: 42px;
        min-width: 450px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
        background-color: ${mainBackground};
        z-index: 999;
      `}
    >
      <div
        css={css`
          @media (max-width: 450px) {
            display: none;
          }
        `}
      >
        <Link css={HeaderStyle} style={{ marginRight: '10px' }} to="" reloadDocument={true}>
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
              & > button {
                color: ${headerItemHovered};
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
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                Helvetica Neue, sans-serif;
            `}
          >
            Modules
          </button>
          <div
            css={css`
              display: none;
              position: absolute;
              background-color: #f1f1f1;
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
                  text-decoration: 'none';
                  :hover {
                    background-color: #ddd;
                  }
                `}
                key={index}
                to={item.link}
                reloadDocument={true}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <Link css={HeaderStyle} to="#" reloadDocument={true}>
          About
        </Link>
      </div>

      <div
        css={css`
          display: contents;
          height: 420px;
          :hover {
            & > div {
              color: ${headerItemHovered};
            }
          }
          @media (min-width: 451px) {
            display: none;
          }
        `}
      >
        <HeaderMenuButton></HeaderMenuButton>
      </div>

      <Link css={HeaderStyle} style={{ fontSize: '18px' }} to="*" reloadDocument={true}>
        Sign In
      </Link>
    </div>
  );
};