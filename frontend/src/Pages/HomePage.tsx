/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ModuleData, modules } from '../Core/Data/ModuleData';
import { mainFontColor } from '../Resources/Colors';
import { Link } from 'react-router-dom';
import {
  SortingModulePreview,
  defaultSortingPreviewState,
} from '../Components/Module Previews/SortingModulePreview';
import {
  StringMatchingModulePreview,
  defaultStringMatchingPreviewState,
} from '../Components/Module Previews/StringMatchingModulePreview';
import {
  PathFindingModulePreview,
  defaultPathFindingPreviewState,
} from '../Components/Module Previews/PathFindingModulePreview';
import React, { useEffect } from 'react';
import { ModuleEnum } from '../Resources/Enumerations';
import { useDispatch } from 'react-redux';
import { updateSortingModulePreviewHeightsStateAction } from '../Redux/Home Page/SortingModulePreviewStateManagement';
import { updateStringMatchingModulePreviewCharactersState } from '../Redux/Home Page/StringMatchingModulePreviewStateManagement';
import { updatePathFindingModulePreviewGridStateAction } from '../Redux/Home Page/PathFindingModulePreviewStateManagement';

interface ModuleProps {
  data: ModuleData;
}

interface ModuleListProps {
  data: ModuleData[];
}

const Module = ({ data }: ModuleProps) => {
  const GetCurrentModule = () => {
    switch (data.moduleType) {
      case ModuleEnum.Sorting:
        return (
          <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
            <SortingModulePreview title={data.title} />
          </Link>
        );

      case ModuleEnum.StringMatching:
        return (
          <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
            <StringMatchingModulePreview title={data.title} />
          </Link>
        );

      case ModuleEnum.PathFinding:
        return (
          <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
            <PathFindingModulePreview title={data.title} />
          </Link>
        );
    }
  };

  return <React.Fragment>{GetCurrentModule()}</React.Fragment>;
};

const ModuleList = ({ data }: ModuleListProps) => (
  <div
    css={css`
      padding-top: 30px;
      padding-bottom: 30px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      resize: vertical;
    `}
  >
    {data.map((module) => (
      <Module key={module.moduleType} data={module} />
    ))}
  </div>
);

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
