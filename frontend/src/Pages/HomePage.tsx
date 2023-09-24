/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ModuleData, modules } from '../Core/Data/ModuleData';
import { mainFontColor } from '../Resources/Colors';
import { Link } from 'react-router-dom';
import { SortingModulePreview } from '../Module Previews/SortingModule';
import { StringMatchingModulePreview } from '../Module Previews/StringMatchingModule';
import { PathFindingModulePreview } from '../Module Previews/PathFindingModule';
import React from 'react';
import { ModuleEnum } from '../Resources/Enumerations';

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
