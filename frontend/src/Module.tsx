import React from 'react';
import { ModuleData } from './ModuleData';

interface Props {
  data: ModuleData;
}

export const Module = ({ data }: Props) => (
  <div>
    <div>{data.title}</div>
    <div>{data.moduleId}</div>
  </div>
);
