/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered, mainBackground, mainFontColor } from '../Resources/Colors';
import { ModuleData } from '../Core/Data/ModuleData';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAboutModalVisibleStateAction } from '../Redux/Shared/AboutModalStateManagements';
import { minAppWidth } from '../Resources/Constants';
import { isTouchDevice } from '../Core/Helper';

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
  ${!isTouchDevice &&
  `
    cursor: pointer;
    :hover {
      color: ${headerItemHovered};
    }
  `}
`;

const HeaderMainComponent = ({ data, isVisible }: Props) => {
  const dispatch = useDispatch();

  return (
    <div
      css={css`
        background-color: ${mainBackground};
        display: ${isVisible ? 'flex' : 'block'};
        justify-content: flex-start;
        width: ${isVisible ? '' : '109px'};
        ${isVisible &&
        `@media (max-width: ${minAppWidth + 100}px) {
          display: none;
        }`};
      `}
    >
      <Link css={HeaderStyle} to="" reloadDocument={true}>
        Home
      </Link>
      <div
        css={css`
          position: relative;
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
        <div
          css={css`
            display: ${isVisible ? 'block' : 'contents'};
            background-color: transparent;
            color: ${mainFontColor};
            font-size: 28px;
            border: none;
            font-family:
              -apple-system,
              BlinkMacSystemFont,
              Segoe UI,
              Roboto,
              Oxygen,
              Ubuntu,
              Cantarell,
              Fira Sans,
              Droid Sans,
              Helvetica Neue,
              sans-serif;
            ${!isTouchDevice &&
            `
              cursor: pointer;
            `}
          `}
        >
          Modules
        </div>
        <div
          css={css`
            display: none;
            position: absolute;
            background-color: #f1f1f1;
            left: ${isVisible ? '0px' : '109px'};
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
      <div css={HeaderStyle} onClick={() => dispatch(updateAboutModalVisibleStateAction(true))}>
        About
      </div>
    </div>
  );
};

const HeaderMenuButton = ({ data }: Props) => {
  const [menuButtonVisible, setMenuButtonVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideMenuButtonClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setMenuButtonVisible(false);
      document.removeEventListener('click', handleOutsideMenuButtonClick, true);
    }
  };
  const handleMenuButtonClick = () => {
    setMenuButtonVisible(!menuButtonVisible);
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
        z-index: 999;
        @media (min-width: ${minAppWidth + 101}px) {
          display: none;
        }
      `}
      ref={ref}
    >
      <div
        css={css`
          ${!isTouchDevice &&
          `
            cursor: pointer;
            :hover {
              & > div {
                background-color: ${headerItemHovered};
              }
            }
          `}
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
          display: ${menuButtonVisible ? 'block' : 'none'};
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
        box-sizing: border-box;
        top: 0;
        width: 100%;
        min-width: ${minAppWidth}px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 10px;
        background-color: ${mainBackground};
        z-index: 999;
        min-height: 36px;
      `}
    >
      <HeaderMainComponent data={data} isVisible={true} />
      <HeaderMenuButton data={data} />

      {/* <Link css={HeaderStyle} style={{ fontSize: '18px' }} to="*" reloadDocument={true}>
        Sign In
      </Link> */}
    </div>
  );
};
