import React from 'react';
import { IModule } from '../IModule';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export const StringMatchingModule = ({ title }: IModule) => {
  const handleModuleMouseEnter = () => {};
  const handleModuleMouseLeave = () => {};

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}>
        <div>TODO String Matching</div>
      </ModulePlaceholder>
    </div>
  );
};
