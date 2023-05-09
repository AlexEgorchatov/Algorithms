/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { IModule } from '../Module';
import { ModulePlaceholder } from '../ModulePlaceHolder';
import { CellState, updatingPathFindingModuleStateAction } from '../../Store/Home Page/PathFindingModuleManagement';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/Store';
import { useDispatch } from 'react-redux';

interface Props {
  state: CellState;
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
        return 'background-color: #1100ff';

      case CellState.Source:
        return 'background-color: green';

      case CellState.Destination:
        return 'background-color: red';

      case CellState.Wall:
        return 'background-color: gray';
    }
  };

  return (
    <div
      css={css`
        height: 30px;
        width: 30px;
        border: 1px;
        border-color: black;
        border-style: solid;
        margin: -1px;
        ${setBackground()}
      `}
    ></div>
  );
};

export const PathFindingModule = ({ title }: IModule) => {
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();
  const columnNumber: number = 8;
  const timeoutID = React.useRef(-1);
  const stepTime: number = 35;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updatingPathFindingModuleStateAction());
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let gridCopy = [...pathFindingState.initialGrid];
    let rowSource: number = 5;
    let columnSource: number = 2;
    let rowDestination: number = 0;

    while (rowSource !== rowDestination) {
      while (true) {
        gridCopy[rowSource * 8 + columnSource] = CellState.Selected;
        dispatch(updatingPathFindingModuleStateAction(gridCopy));
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));
        gridCopy = [...gridCopy];

        if (columnSource + 1 >= columnNumber || pathFindingState.initialGrid[rowSource * 8 + columnSource + 1] === CellState.Wall)
          break;
        else columnSource++;
      }

      if (rowSource - 1 === rowDestination) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        rowSource = 5;
        columnSource = 2;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 4));
        gridCopy = [...pathFindingState.initialGrid];
      } else rowSource--;
    }
  };

  const handleModuleMouseLeave = () => {
    clearTimeout(timeoutID.current);
    resetComponentState();
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}>
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {pathFindingState.initialGrid.map((state: CellState, index) => (
            <GridCell key={index} state={state} />
          ))}
        </div>
      </ModulePlaceholder>
    </div>
  );
};
