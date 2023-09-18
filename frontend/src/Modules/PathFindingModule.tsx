/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { ModuleTitle } from '../Pages/HomePage';
import { ModulePlaceholder } from '../Components/ModulePlaceHolder';
import { updatePathFindingModuleStateAction } from '../Store/Home Page/PathFindingModuleStateManagement';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { CellStateEnum } from '../Resources/Enumerations';

interface Props {
  state: CellStateEnum;
}

const GridCell = ({ state = CellStateEnum.Unselected }: Props) => {
  useEffect(() => {
    setBackground();
  });

  const setBackground = () => {
    switch (state) {
      case CellStateEnum.Unselected:
        return 'background-color: #ffffff';

      case CellStateEnum.Selected:
        return 'background-color: #1100ff';

      case CellStateEnum.Source:
        return 'background-color: green';

      case CellStateEnum.Destination:
        return 'background-color: red';

      case CellStateEnum.Wall:
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

export const PathFindingModule = ({ title }: ModuleTitle) => {
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();
  const columnNumber: number = 8;
  const timeoutID = React.useRef(-1);
  const stepTime: number = 35;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updatePathFindingModuleStateAction());
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let gridCopy = [...pathFindingState.pathFindingModuleGrid];
    let rowSource: number = 5;
    let columnSource: number = 2;
    let rowDestination: number = 0;

    while (rowSource !== rowDestination) {
      while (true) {
        gridCopy[rowSource * 8 + columnSource] = CellStateEnum.Selected;
        dispatch(updatePathFindingModuleStateAction(gridCopy));
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));
        gridCopy = [...gridCopy];

        if (columnSource + 1 >= columnNumber || pathFindingState.pathFindingModuleGrid[rowSource * 8 + columnSource + 1] === CellStateEnum.Wall) break;
        else columnSource++;
      }

      if (rowSource - 1 === rowDestination) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        rowSource = 5;
        columnSource = 2;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 4));
        gridCopy = [...pathFindingState.pathFindingModuleGrid];
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
          {pathFindingState.pathFindingModuleGrid.map((state: CellStateEnum, index) => (
            <GridCell key={index} state={state} />
          ))}
        </div>
      </ModulePlaceholder>
    </div>
  );
};
