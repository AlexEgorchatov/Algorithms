/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ModuleData } from '../Resources/Module Resources/ModuleData';
import { Module } from './Module';

interface Props {
  data: ModuleData[];
}

export const ModuleList = ({ data }: Props) => (
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
