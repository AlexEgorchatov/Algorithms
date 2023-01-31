/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { IModule } from '../Module';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export enum CellState {
  Unselected = 0,
  Selected = 1,
  Source = 2,
  Destination = 2,
  Path = 2,
}

interface Props {
  state?: CellState;
}

const GridCell = ({ state = CellState.Unselected }: Props) => {
  useEffect(() => {
    setBackground();
  });

  const setBackground = () => {
    switch (state) {
      case CellState.Unselected:
        return 'background-color: #ffffff';

      case CellState.Selected:
        return 'background-color: orange';

      case CellState.Source:
        return 'background-color: green';

      case CellState.Destination:
        return 'background-color: red';

      case CellState.Path:
        return 'background-color: purple';
    }
  };

  return (
    <div
      css={css`
        height: 50px;
        width: 50px;
        ${setBackground()}
      `}
    ></div>
  );
};

export const PathFindingModule = ({ title }: IModule) => {
  const handleModuleMouseEnter = () => {};
  const handleModuleMouseLeave = () => {};

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}></ModulePlaceholder>
    </div>
  );
};
