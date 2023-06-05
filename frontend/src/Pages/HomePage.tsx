/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ModuleList } from '../Components/ModuleList';
import { modules } from '../Resources/Home Page Resources/ModuleData';
import { mainFontColor } from '../Resources/Colors';

export const HomePage = () => (
  <div
    css={css`
      display: block;
      overflow: auto;
      min-height: 87vh;
    `}
  >
    <div
      css={css`
        color: ${mainFontColor};
        font-size: 48px;
        text-align: center;
      `}
    >
      Welcome to the Algorithms project!
    </div>
    <ModuleList data={modules} />
  </div>
);
