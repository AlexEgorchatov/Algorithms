/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/Store';

export const AboutForm = () => {
  const headerState = useSelector((state: AppState) => state.headerState);

  return (
    <div>
      {headerState.aboutFormVisible && (
        <div
          css={css`
            background-color: green;
            position: relative;
            position: fixed;
            z-index: 999;
            top: 25%;
            left: 25%;
            width: 50%;
            height: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          `}
        >
          <div>This is a test form</div>
        </div>
      )}
    </div>
  );
};
