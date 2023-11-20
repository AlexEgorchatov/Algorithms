/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { WarningSignComponent } from './WarningSign';
import { warningMessageColor } from '../Resources/Colors';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';

interface Props {
  message: string;
}

export const WarningMessageComponent = ({ message }: Props) => {
  const animationState = useSelector((state: AppState) => state.animationState);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 34px;
        color: white;
        font-size: 13px;
        font-weight: bold;
        margin-left: 10px;
        color: ${warningMessageColor};
        visibility: ${!animationState.canAnimationBeStarted ? 'visible' : 'hidden'};
      `}
    >
      <WarningSignComponent />
      <div
        css={css`
          margin-left: 3px;
        `}
      >
        {message}
      </div>
    </div>
  );
};
