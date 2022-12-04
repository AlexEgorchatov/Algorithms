/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { ModuleData } from './ModuleData';
import { ModuleEnumeration } from './ModuleEnumeration';
import { SortingModule } from './SortingModule';
import { StringMatchingModule } from './StringMatchingModule';
import { PathFindingModule } from './PathFindingModule';

interface Props {
  data: ModuleData;
}

export const Module = ({ data }: Props) => {
  const module = () => {
    switch (data.moduleType) {
      case ModuleEnumeration.Sorting:
        return <SortingModule />;

      case ModuleEnumeration.StringMatching:
        return <StringMatchingModule />;

      case ModuleEnumeration.PathFinding:
        return <PathFindingModule />;
    }
  };

  return (
    <div
      css={css`
        margin: 20px;
        width: 300px;
        height: 300px;
      `}
    >
      <div
        css={css`
          background-color: #777777;
          height: 270px;
        `}
      >
        {module()}
      </div>
      <div
        css={css`
          font-size: 24px;
          color: #ffffff;
          text-align: center;
        `}
      >
        {data.title}
      </div>
    </div>
  );
};
