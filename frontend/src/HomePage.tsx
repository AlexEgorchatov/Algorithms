import React from 'react';
import { ModuleList } from './ModuleList';
import { modules } from './ModuleData';

export const HomePage = () => (
  <div>
    <ModuleList data={modules} />
  </div>
);
