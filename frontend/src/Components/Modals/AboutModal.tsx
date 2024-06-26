/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useSelector } from 'react-redux';
import { AppState } from '../../Redux/Store';
import { useDispatch } from 'react-redux';
import { headerItemHovered, mainFontColor, moduleBackground } from '../../Resources/Colors';
import { CloseButton } from '../Shared Components/CloseButton';
import { updateAboutModalVisibleStateAction } from '../../Redux/Shared/AboutModalStateManagements';
import { minAppWidth } from '../../Resources/Constants';

const animationDuration = '0.2s';
const modalMaxHeight: number = 220;
const sourceTopPosition = '-300px';
const destinationTopPosition = `${-(window.innerHeight / 2) * 0.2}px`;

const openModalMove = keyframes`
  from {
    top: ${sourceTopPosition};
  }
  to {
    top: ${destinationTopPosition};
  }
`;

const closeModalMove = keyframes`
  from {
    top: ${destinationTopPosition};
  }
  to {
    top: ${sourceTopPosition};
  }
`;

const openModalVisibility = keyframes`
  from {
    opacity: 0;
    display: none;
  }
  to {
    opacity: 1;
    display: flex;
  }
`;

const closeModalVisibility = keyframes`
  from {
    opacity: 1;
    display: flex;
  }
  to {
    opacity: 0;
    display: none;
  }
`;

export const AboutModal = () => {
  const aboutModalState = useSelector((state: AppState) => state.aboutModalState);
  const dispatch = useDispatch();

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      css={css`
        position: fixed;
        display: ${aboutModalState.aboutModalVisible ? 'flex' : 'none'};
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-width: ${minAppWidth}px;
        background: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
        z-index: 999;
        animation-name: ${aboutModalState.aboutModalVisible
          ? openModalVisibility
          : closeModalVisibility};
        animation-duration: ${animationDuration};
      `}
      onClick={() => dispatch(updateAboutModalVisibleStateAction(false))}
    >
      <div
        css={css`
          position: relative;
          background: ${moduleBackground};
          padding: 10px;
          min-height: 180px;
          max-height: ${modalMaxHeight}px;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          animation-name: ${aboutModalState.aboutModalVisible ? openModalMove : closeModalMove};
          animation-duration: ${animationDuration};
          top: ${destinationTopPosition};
        `}
        onClick={stopPropagation}
      >
        <div
          css={css`
            color: white;
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
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: baseline;
              justify-content: space-between;
            `}
          >
            <h1
              css={css`
                margin: 0px 0px 10px 0px;
                color: ${mainFontColor};
              `}
            >
              About
            </h1>
            <div onClick={() => dispatch(updateAboutModalVisibleStateAction(false))}>
              <CloseButton />
            </div>
          </div>
          <div
            css={css`
              font-size: 18px;
            `}
          >
            This is a training project to visualize various algorithms. It is implemented using
            TypeScript programming language and Redux state management system. For feedback:
            alex.exorchatov@gmail.com
          </div>
          <a
            css={css`
              font-size: 16px;
              color: white;
              :visited {
                color: ${mainFontColor};
              }
              :hover {
                color: ${headerItemHovered};
              }
            `}
            href="https://github.com/AlexEgorchatov/Algorithms/tree/master"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              css={css`
                width: 14px;
                margin-right: 5px;
                margin-top: 10px;
              `}
              src={require(`../../Resources/Icons/github-mark-white.png`)}
              alt="GitHub icon"
            />
            Check the repository
          </a>
        </div>
      </div>
    </div>
  );
};
