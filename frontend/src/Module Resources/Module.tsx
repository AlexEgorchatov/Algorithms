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
  const [isMouseOver, setIsMouseOver] = React.useState(false);

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

  const handleModuleMouseEnter = () => {
    setIsMouseOver(true);
    data.startAnimation({});
  };
  const handleModuleMouseLeave = () => {
    setIsMouseOver(false);
    data.stopAnimation();
  };

  return (
    <div
      css={css`
        margin: 10px;
        padding: ${isMouseOver ? `8px` : `10px`};
        width: 240px;
        height: 240px;
        border-style: solid;
        border-color: #e8610e;
        border-width: ${isMouseOver ? `2px` : `0px`};
        cursor: pointer;
      `}
      onMouseEnter={handleModuleMouseEnter}
      onMouseLeave={handleModuleMouseLeave}
    >
      <div
        css={css`
          background-color: #777777;
          height: 210px;
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
