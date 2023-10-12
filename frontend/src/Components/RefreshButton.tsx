/**@jsxImportSource @emotion/react */
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { css } from '@emotion/react';
import { headerItemHovered } from '../Resources/Colors';

interface Props {
  refreshFunction: () => void;
}

export const RefreshButton = ({ refreshFunction }: Props) => {
  const algorithmState = useSelector((state: AppState) => state.animationState);

  const handleRefreshButtonClick = () => {
    if (algorithmState.hasAnimationStarted) return;

    refreshFunction();
  };

  return (
    <div
      css={css`
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        position: relative;
        display: flex;
        transform: scale(var(--ggs, 1));
        width: 22px;
        height: 22px;
        border: 2px solid;
        border-radius: 4px;
        color: white;
        cursor: ${!algorithmState.hasAnimationStarted ? 'pointer' : 'default'};
        opacity: ${!algorithmState.hasAnimationStarted ? '1' : '0.5'};
        :hover {
          ${!algorithmState.hasAnimationStarted &&
          `
              color: ${headerItemHovered};
              & > div {
                color: ${headerItemHovered};
              }
            `}
        }
      `}
      onClick={handleRefreshButtonClick}
    >
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs, 1));
          width: 12px;
          height: 12px;
          border: 2px solid;
          border-right-color: transparent;
          border-radius: 100px;
          color: white;
          ::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 6px;
            height: 6px;
            border-top: 2px solid;
            border-right: 2px solid;
            top: -3px;
            right: -1px;
            transform: rotate(68deg);
          }
        `}
      ></div>
    </div>
  );
};
