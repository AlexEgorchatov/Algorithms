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

export const PathFindingModulePreview = ({ title }: IModulePreviewTitle) => {
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModulePreviewState);
  const dispatch = useDispatch();
  const columnNumber: number = 8;
  const timeoutID = React.useRef(-1);
  const stepTime: number = 35;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    dispatch(updatePathFindingModulePreviewGridStateAction());
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let gridCopy = [...pathFindingState.grid];
    let rowSource: number = 5;
    let columnSource: number = 2;
    let rowDestination: number = 0;

    while (rowSource !== rowDestination) {
      while (true) {
        gridCopy[rowSource * 8 + columnSource] = PathFindingCellStateEnum.Checked;
        dispatch(updatePathFindingModulePreviewGridStateAction(gridCopy));
        gridCopy = [...gridCopy];
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));

        if (
          columnSource + 1 >= columnNumber ||
          pathFindingState.grid[rowSource * 8 + columnSource + 1] === PathFindingCellStateEnum.Wall
        )
          break;
        else columnSource++;
      }

      if (rowSource - 1 === rowDestination) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        gridCopy = [...pathFindingState.grid];
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
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {pathFindingState.grid.map((state: PathFindingCellStateEnum, index) => (
            <GridCell key={index} state={state} />
          ))}
        </div>
      </ModulePreviewPlaceholder>
    </div>
  );
};
