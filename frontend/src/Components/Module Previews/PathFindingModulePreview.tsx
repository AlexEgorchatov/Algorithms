/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { ModulePreviewPlaceholder } from '../ModulePreviewPlaceholder';
import { updatePathFindingModulePreviewGridStateAction } from '../../Store/Home Page/Module Previews/PathFindingModulePreviewStateManagement';
import { useSelector } from 'react-redux';
import { AppState } from '../../Store/Store';
import { useDispatch } from 'react-redux';
import { PathFindingCellStateEnum } from '../../Resources/Enumerations';
import { IModulePreviewTitle } from '../../Core/Interfaces/IModuleTitle';
import { completionColor } from '../../Resources/Colors';

interface Props {
  state: PathFindingCellStateEnum;
}

const GridCell = ({ state = PathFindingCellStateEnum.Unselected }: Props) => {
  useEffect(() => {
    setBackground();
  });

  const setBackground = () => {
    switch (state) {
      case PathFindingCellStateEnum.Unselected:
        return 'background-color: white';

      case PathFindingCellStateEnum.Checked:
        return `background-color: ${completionColor}`;

      case PathFindingCellStateEnum.Source:
        return 'background-color: green';

      case PathFindingCellStateEnum.Destination:
        return 'background-color: red';

      case PathFindingCellStateEnum.Wall:
        return 'background-color: #ae7a59';
    }
  };

  return (
    <div
      css={css`
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        outline: 0.5px solid black;
        border: 0.5px solid black;
        ${setBackground()}
      `}
    ></div>
  );
};

export const PathFindingModulePreview = ({ title }: IModulePreviewTitle) => {
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModulePreviewState);
  const dispatch = useDispatch();
  const timeoutID = React.useRef(-1);
  const stepTime: number = 35;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    let grid: PathFindingCellStateEnum[][] = new Array(7);
    for (let i = 0; i < 7; i++) {
      grid[i] = new Array(8);
      for (let j = 0; j < 8; j++) {
        grid[i][j] = PathFindingCellStateEnum.Unselected;
      }
    }

    grid[5][1] = PathFindingCellStateEnum.Source;
    grid[0][7] = PathFindingCellStateEnum.Destination;
    grid[4][4] = PathFindingCellStateEnum.Wall;
    grid[5][4] = PathFindingCellStateEnum.Wall;
    grid[6][4] = PathFindingCellStateEnum.Wall;
    dispatch(updatePathFindingModulePreviewGridStateAction(grid));
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let gridCopy = pathFindingState.grid.map((row) => [...row]);
    let rowSource: number = 5;
    let columnSource: number = 2;
    let rowDestination: number = 0;

    while (rowSource !== rowDestination) {
      while (true) {
        gridCopy[rowSource][columnSource] = PathFindingCellStateEnum.Checked;
        dispatch(updatePathFindingModulePreviewGridStateAction(gridCopy));
        gridCopy = gridCopy.map((row) => [...row]);
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));

        if (
          columnSource + 1 >= 8 ||
          pathFindingState.grid[rowSource][columnSource + 1] === PathFindingCellStateEnum.Wall
        )
          break;
        else columnSource++;
      }

      if (rowSource - 1 === rowDestination) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        gridCopy = pathFindingState.grid.map((row) => [...row]);
        rowSource = 5;
        columnSource = 2;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 4));
      } else rowSource--;
    }
  };

  const handleModuleMouseLeave = () => {
    clearTimeout(timeoutID.current);
    resetComponentState();
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePreviewPlaceholder title={title}>
        <div>
          {pathFindingState.grid.map((row, rowIndex) => (
            <div
              css={css`
                display: flex;
              `}
              key={rowIndex}
            >
              {row.map((cellState, columnIndex) => (
                <GridCell key={columnIndex} state={cellState} />
              ))}
            </div>
          ))}
        </div>
      </ModulePreviewPlaceholder>
    </div>
  );
};
