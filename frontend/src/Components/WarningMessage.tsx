/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { WarningSignComponent } from './WarningSign';
import { warningMessageColor } from '../Resources/Colors';

interface Props {
  message: string;
  isVisible: boolean;
}

export const WarningMessageComponent = ({ message, isVisible = false }: Props) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        color: white;
        font-size: 13px;
        font-weight: bold;
        margin-left: 10px;
        color: ${warningMessageColor};
        visibility: ${isVisible ? 'visible' : 'hidden'};
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
