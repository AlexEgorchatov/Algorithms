import React from 'react';
import { ModuleData } from './ModuleData';
import { Module } from './Module';

interface Props {
  data: ModuleData[];
}

export const ModuleList = ({ data }: Props) => (
  <ul>
    {data.map((module) => (
      <div>
        <Module data={module} />
      </div>
    ))}
  </ul>
);
