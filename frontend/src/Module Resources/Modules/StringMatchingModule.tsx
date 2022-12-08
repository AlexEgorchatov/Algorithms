import React from 'react';
import { IModule } from '../IModule';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export const StringMatchingModule = ({ title }: IModule) => {
  const handleModuleMouseEnter = () => {
    console.log('Entered String Matching module');
  };
  const handleModuleMouseLeave = () => {
    console.log('Left String Matching module');
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}>
        <div>TODO String Matching</div>
      </ModulePlaceholder>
    </div>
  );
};
