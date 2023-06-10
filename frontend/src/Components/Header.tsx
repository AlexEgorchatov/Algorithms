/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered, mainBackground, mainFontColor } from '../Resources/Colors';
import { ModuleData } from '../Resources/Home Page Resources/ModuleData';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { updatingHeaderStateAction } from '../Store/Home Page/HeaderStateManagement';

interface Props {
  data: ModuleData[];
  isVisible?: boolean;
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

const HeaderMainComponent = ({ data, isVisible }: Props) => {
  return (
    <div
      css={css`
        background-color: ${mainBackground};
        ${isVisible &&
        `@media (max-width: 450px) {
          display: none;
        }`}
      `}
    >
      <Link css={HeaderStyle} to="" reloadDocument={true}>
        Home
      </Link>
      <div
        css={css`
          position: relative;
          display: inline-block;
          vertical-align: super;
          margin: ${isVisible ? '0px 10px' : '0px'};
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
            display: ${isVisible ? 'block' : 'contents'};
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
            left: ${isVisible ? '0px' : '107px'};
            top: ${isVisible ? '' : '0px'};
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

const HeaderMenuButton = ({ data }: Props) => {
  const headerState = useSelector((state: AppState) => state.headerState);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideMenuButtonClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      dispatch(updatingHeaderStateAction(false));
    }
    document.removeEventListener('click', handleOutsideMenuButtonClick, true);
  };
  const handleMenuButtonClick = () => {
    dispatch(updatingHeaderStateAction(!headerState.initialMenuButtonVisibility));
    document.addEventListener('click', handleOutsideMenuButtonClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideMenuButtonClick, true);
    };
  };

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
        cursor: pointer;
        @media (min-width: 451px) {
          display: none;
        }
      `}
      ref={ref}
    >
      <div
        css={css`
          :hover {
            & > div {
              background-color: ${headerItemHovered};
            }
          }
        `}
        onClick={handleMenuButtonClick}
      >
        <div css={barStyle}></div>
        <div css={barStyle}></div>
        <div css={barStyle}></div>
      </div>
      <div
        css={css`
          position: absolute;
          margin-left: -1px;
          display: ${headerState.initialMenuButtonVisibility ? 'block' : 'none'};
        `}
      >
        <HeaderMainComponent data={data} isVisible={false} />
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
        padding: 0px 10px;
        background-color: ${mainBackground};
        z-index: 999;
      `}
    >
      <HeaderMainComponent data={data} isVisible={true} />
      <HeaderMenuButton data={data} />

      <Link css={HeaderStyle} style={{ fontSize: '18px' }} to="*" reloadDocument={true}>
        Sign In
      </Link>
    </div>
  );
};
