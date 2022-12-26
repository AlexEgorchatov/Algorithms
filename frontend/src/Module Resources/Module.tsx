import { ModuleData } from './ModuleData';
import { ModuleEnumeration } from './ModuleEnumeration';
import { SortingModule } from './Modules/SortingModule';
import { StringMatchingModule } from './Modules/StringMatchingModule';
import { PathFindingModule } from './Modules/PathFindingModule';
import React from 'react';

interface Props {
  data: ModuleData;
}

export const Module = ({ data }: Props) => {
  const GetCurrentModule = () => {
    switch (data.moduleType) {
      case ModuleEnumeration.Sorting:
        return <SortingModule title={data.title} />;

      case ModuleEnumeration.StringMatching:
        return <StringMatchingModule title={data.title} />;

      case ModuleEnumeration.PathFinding:
        return <PathFindingModule title={data.title} />;
    }
  };

  return <React.Fragment>{GetCurrentModule()}</React.Fragment>;
};
