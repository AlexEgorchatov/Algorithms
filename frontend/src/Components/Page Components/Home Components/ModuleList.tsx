/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ModuleData } from '../../../Core/Data/ModuleData';
import { Module } from './Module';

interface ModuleListProps {
  data: ModuleData[];
}

export const ModuleList = ({ data }: ModuleListProps) => (
  <div
    css={css`
      padding-top: 30px;
      padding-bottom: 30px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      resize: vertical;
    `}
  >
    {data.map((module) => (
      <Module key={module.moduleType} data={module} />
    ))}
  </div>
);
