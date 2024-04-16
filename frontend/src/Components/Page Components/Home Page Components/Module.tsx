import { Link } from 'react-router-dom';
import { ModuleData } from '../../../Core/Data/ModuleData';
import { ModuleEnum } from '../../../Resources/Enumerations';
import { SortingModulePreview } from '../../Module Previews/SortingModulePreview';
import { StringMatchingModulePreview } from '../../Module Previews/StringMatchingModulePreview';
import { PathFindingModulePreview } from '../../Module Previews/PathFindingModulePreview';
import React from 'react';

interface ModuleProps {
  data: ModuleData;
}

export const Module = ({ data }: ModuleProps) => {
  const modules = {
    [ModuleEnum.Sorting]: (
      <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
        <SortingModulePreview title={data.title} />
      </Link>
    ),
    [ModuleEnum.StringMatching]: (
      <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
        <StringMatchingModulePreview title={data.title} />
      </Link>
    ),
    [ModuleEnum.PathFinding]: (
      <Link to={data.link} style={{ textDecoration: 'none' }} reloadDocument={true}>
        <PathFindingModulePreview title={data.title} />
      </Link>
    ),
  };

  return <React.Fragment>{modules[data.moduleType]}</React.Fragment>;
};
