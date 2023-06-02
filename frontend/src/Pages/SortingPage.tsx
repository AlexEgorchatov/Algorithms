/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { mainFontColor, moduleBackground } from '../Resources/Colors';
import { Slider } from '../Components/Slider';

export const SortingPage = () => {
  return (
    <div
      css={css`
        color: ${mainFontColor};
        font-size: 36px;
        text-align: left;
      `}
    >
      Sorting
      <div
        css={css`
          background-color: ${moduleBackground};
        `}
      >
        <Slider />
      </div>
    </div>
  );
};
