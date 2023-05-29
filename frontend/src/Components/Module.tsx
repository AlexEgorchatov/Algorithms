import { ModuleData } from '../Resources/Module Resources/ModuleData';
import { ModuleEnumeration } from '../Resources/Module Resources/ModuleEnumeration';
import { SortingModule } from '../Modules/SortingModule';
import { StringMatchingModule } from '../Modules/StringMatchingModule';
import { PathFindingModule } from '../Modules/PathFindingModule';
import React from 'react';
import { Link } from 'react-router-dom';

export interface ModuleTitle {
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
