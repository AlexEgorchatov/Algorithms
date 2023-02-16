import { ModuleData } from './ModuleData';
import { ModuleEnumeration } from './ModuleEnumeration';
import { SortingModule } from './Modules/SortingModule';
import { StringMatchingModule } from './Modules/StringMatchingModule';
import { PathFindingModule } from './Modules/PathFindingModule';
import React from 'react';
import { Link } from 'react-router-dom';

export interface IModule {
  title: string;
}
interface Props {
  data: ModuleData;
}

export const Module = ({ data }: Props) => {
  const GetCurrentModule = () => {
    switch (data.moduleType) {
      case ModuleEnumeration.Sorting:
        return (
          <Link to="sort" style={{ textDecoration: 'none' }}>
            <SortingModule title={data.title} />
          </Link>
        );

      case ModuleEnumeration.StringMatching:
        return (
          <Link to="search" style={{ textDecoration: 'none' }}>
            <StringMatchingModule title={data.title} />
          </Link>
        );

      case ModuleEnumeration.PathFinding:
        return (
          <Link to="path_find" style={{ textDecoration: 'none' }}>
            <PathFindingModule title={data.title} />
          </Link>
        );
    }
  };

  return <React.Fragment>{GetCurrentModule()}</React.Fragment>;
};
