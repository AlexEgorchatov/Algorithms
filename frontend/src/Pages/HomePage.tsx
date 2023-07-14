/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ModuleData, ModuleEnumeration, modules } from '../Resources/Home Page Resources/ModuleData';
import { mainFontColor } from '../Resources/Colors';
import { Link } from 'react-router-dom';
import { SortingModule } from '../Modules/SortingModule';
import { StringMatchingModule } from '../Modules/StringMatchingModule';
import { PathFindingModule } from '../Modules/PathFindingModule';
import React from 'react';

export interface ModuleTitle {
  title: string;
}

interface ModuleProps {
  data: ModuleData;
}

interface ModuleListProps {
  data: ModuleData[];
}

const Module = ({ data }: ModuleProps) => {
  const GetCurrentModule = () => {
    switch (data.moduleType) {
      case ModuleEnumeration.Sorting:
        return (
          <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
            <SortingModule title={data.title} />
          </Link>
        );

      case ModuleEnumeration.StringMatching:
        return (
          <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
            <StringMatchingModule title={data.title} />
          </Link>
        );

      case ModuleEnumeration.PathFinding:
        return (
          <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
            <PathFindingModule title={data.title} />
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
