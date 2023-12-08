/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ModuleData, modules } from '../Core/Data/ModuleData';
import { mainFontColor } from '../Resources/Colors';
import { Link } from 'react-router-dom';
import { SortingModulePreview } from '../Components/Module Previews/SortingModulePreview';
import { StringMatchingModulePreview } from '../Components/Module Previews/StringMatchingModulePreview';
import { PathFindingModulePreview } from '../Components/Module Previews/PathFindingModulePreview';
import React, { useEffect } from 'react';
import {
  ModuleEnum,
  PathFindingCellStateEnum,
  StringMatchingCharacterStateEnum,
} from '../Resources/Enumerations';
import { useDispatch } from 'react-redux';
import { updateSortingModulePreviewHeightsStateAction } from '../Store/Home Page/Module Previews/SortingModulePreviewStateManagement';
import { updateStringMatchingModulePreviewCharactersState } from '../Store/Home Page/Module Previews/StringMatchingModulePreviewStateManagement';
import { updatePathFindingModulePreviewGridStateAction } from '../Store/Home Page/Module Previews/PathFindingModulePreviewStateManagement';

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

  const initializeSortingPreview = () => {
    dispatch(updateSortingModulePreviewHeightsStateAction([180, 100, 120, 140, 160]));
  };
  const initializeStringMatchingPreview = () => {
    dispatch(
      updateStringMatchingModulePreviewCharactersState([
        StringMatchingCharacterStateEnum.Unselected,
        StringMatchingCharacterStateEnum.Unselected,
        StringMatchingCharacterStateEnum.Unselected,
        StringMatchingCharacterStateEnum.Unselected,
        StringMatchingCharacterStateEnum.Unselected,
        StringMatchingCharacterStateEnum.Unselected,
        StringMatchingCharacterStateEnum.Unselected,
      ]),
    );
  };
  const initializePathFindingPreview = () => {
    let grid: PathFindingCellStateEnum[][] = new Array(7);
    for (let i = 0; i < 7; i++) {
      grid[i] = new Array(8);
      for (let j = 0; j < 8; j++) {
        grid[i][j] = PathFindingCellStateEnum.Unselected;
      }
    }

    grid[5][1] = PathFindingCellStateEnum.Source;
    grid[0][7] = PathFindingCellStateEnum.Destination;
    grid[4][4] = PathFindingCellStateEnum.Wall;
    grid[5][4] = PathFindingCellStateEnum.Wall;
    grid[6][4] = PathFindingCellStateEnum.Wall;

    dispatch(updatePathFindingModulePreviewGridStateAction(grid));
  };

  useEffect(() => {
    initializeSortingPreview();
    initializeStringMatchingPreview();
    initializePathFindingPreview();
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
        Welcome to the Algorithms project!
      </div>
      <ModuleList data={modules} />
    </div>
  );
};
