import React from 'react';
import { ModuleData } from './ModuleData';
import { ModuleEnumeration } from './ModuleEnumeration';
import { SortingModule } from './SortingModule';
import { StringMatchingModule } from './StringMatchingModule';
import { PathFindingModule } from './PathFindingModule';

interface Props {
  data: ModuleData;
}

export const Module = ({ data }: Props) => {
  const module = () => {
    switch (data.moduleType) {
      case ModuleEnumeration.Sorting:
        return <SortingModule />;

      case ModuleEnumeration.StringMatching:
        return <StringMatchingModule />;

      case ModuleEnumeration.PathFinding:
        return <PathFindingModule />;
    }
  };

  return (
    <div>
      <div>{data.title}</div>
      {module()}
    </div>
  );
};
