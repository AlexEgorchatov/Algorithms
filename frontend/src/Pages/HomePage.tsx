/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { modules } from '../Core/Data/ModuleData';
import { mainFontColor } from '../Resources/Colors';
import { defaultSortingPreviewState } from '../Components/Module Previews/SortingModulePreview';
import { defaultStringMatchingPreviewState } from '../Components/Module Previews/StringMatchingModulePreview';
import { defaultPathFindingPreviewState } from '../Components/Module Previews/PathFindingModulePreview';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSortingModulePreviewHeightsStateAction } from '../Redux/Home Page/SortingModulePreviewStateManagement';
import { updateStringMatchingModulePreviewCharactersState } from '../Redux/Home Page/StringMatchingModulePreviewStateManagement';
import { updatePathFindingModulePreviewGridStateAction } from '../Redux/Home Page/PathFindingModulePreviewStateManagement';
import { ModuleList } from '../Components/Page Components/Home Components/ModuleList';

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSortingModulePreviewHeightsStateAction(defaultSortingPreviewState));
    dispatch(updateStringMatchingModulePreviewCharactersState(defaultStringMatchingPreviewState));
    dispatch(updatePathFindingModulePreviewGridStateAction(defaultPathFindingPreviewState));
  }, []);

  return (
    <div
      css={css`
        display: block;
        overflow: auto;
        height: 100%;
      `}
    >
      <div
        css={css`
          color: ${mainFontColor};
          font-size: 48px;
          text-align: center;
        `}
      >
        Welcome to the Algorithms!
      </div>
      <ModuleList data={modules} />
    </div>
  );
};
