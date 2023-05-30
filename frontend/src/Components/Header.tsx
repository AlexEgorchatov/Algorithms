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

const HeaderMainComponent = ({ data }: Props) => {
  return (
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
  );
};

const HeaderMenuButton = () => {
  const barStyle = css`
    width: 30px;
    height: 4px;
    background-color: ${mainFontColor};
    margin: 6px 0;
  `;

  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
        :hover {
          & > div.bar {
            background-color: ${headerItemHovered};
          }
        }
        @media (min-width: 4501px) {
          display: none;
        }
      `}
    >
      <div className="bar" css={barStyle}></div>
      <div className="bar" css={barStyle}></div>
      <div className="bar" css={barStyle}></div>
      <div
        className="test"
        css={css`
          display: none;
        `}
      >
        <a>Test1</a>
        <a>Test1</a>
        <a>Test1</a>
      </div>
    </div>
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
        height: 50px;
        min-width: 450px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
        background-color: ${mainBackground};
        z-index: 999;
      `}
    >
      <HeaderMainComponent data={data} />
      <HeaderMenuButton />

      <Link css={HeaderStyle} style={{ fontSize: '18px' }} to="*" reloadDocument={true}>
        Sign In
      </Link>
    </div>
  );
};
