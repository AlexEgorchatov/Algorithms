import React from 'react';
import { IModule } from '../IModule';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export const PathFindingModule = ({ title }: IModule) => {
  const handleModuleMouseEnter = () => {
    console.log('Entered Path Finding module');
  };
  const handleModuleMouseLeave = () => {
    console.log('Left Path Finding module');
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}></ModulePlaceholder>
    </div>
  );
};
