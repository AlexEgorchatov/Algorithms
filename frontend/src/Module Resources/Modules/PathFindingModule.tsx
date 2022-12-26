import React from 'react';
import { IModule } from '../IModule';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export const PathFindingModule = ({ title }: IModule) => {
  const handleModuleMouseEnter = () => {};
  const handleModuleMouseLeave = () => {};

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}></ModulePlaceholder>
    </div>
  );
};
