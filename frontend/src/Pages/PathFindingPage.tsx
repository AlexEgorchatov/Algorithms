/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { algorithmContext, animationContext, minAnimationContainerHeight, minAppWidth } from '../Core/Helper';
import { ActionBar } from '../Components/ActionBar';
import { ResetButton } from '../Components/ResetButton';
import { pathFindingAlgorithmsData } from '../Core/Data/PathFindingData';
import { AnimationManager } from '../Core/Other/AnimationManager';
import { PathFindingAlgorithmsManager, getCellColor, resetCellsRefsBackground } from '../Core/Other/PathFindingAlgorithmsManager';
import { AlgorithmsList } from '../Components/AlgorithmsList';
import { SliderComponent } from '../Components/Slider';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { AppState, store } from '../Store/Store';
import { IPathFindingCellProps } from '../Core/Interfaces/IPathFindingCellProps';
import {
  updatePathFindingSelectedCellActionState,
  updatePathFindingGridState,
  updatePathFindingSourceState,
  updatePathFindingDestinationState,
  updatePathFindingSelectedCellDraggingState,
} from '../Store/Path Finding Module/PathFindingModuleStateManagement';
import { WarningMessageComponent } from '../Components/WarningMessage';
import { PathFindingCellActionStateEnum, PathFindingCellDraggingStateEnum, PathFindingCellStateEnum } from '../Resources/Enumerations';

interface CellActionItemProps {
  cellActionState: PathFindingCellActionStateEnum;
}

let pathFindingAlgorithmManager: PathFindingAlgorithmsManager = new PathFindingAlgorithmsManager(pathFindingAlgorithmsData[0].algorithm);
let pathFindingAnimationManager: AnimationManager = new AnimationManager(pathFindingAlgorithmManager);
let minAnimationComponentWidth: number = 0;
let internalGrid: IPathFindingCellProps[][] = [];
let movedCell: React.RefObject<HTMLDivElement>;
let droppedCell: [number, number];
let source: IPathFindingCellProps;
let destination: IPathFindingCellProps;

const cellSize: number = 25;
const getCellsInRowCount = (windowWidth: number): number => {
  return Math.floor((Math.max(windowWidth, minAppWidth) - cellSize) / cellSize);
};
const setNewGridState = () => {
  if (store.getState().animationState.hasAnimationStarted) return;
  if (internalGrid.length === 0) return;

  if (store.getState().pathFindingModuleState.pathFindingSelectedCellDragging === PathFindingCellDraggingStateEnum.None) {
    store.dispatch(updatePathFindingGridState(internalGrid));
    resetCellsRefsBackground(pathFindingAlgorithmManager.cellsRefs);

    store.dispatch(updatePathFindingSourceState(source));
    store.dispatch(updatePathFindingDestinationState(destination));
  } else {
    if (movedCell.current === null) return;

    if (internalGrid[droppedCell[0]][droppedCell[1]].cellState === PathFindingCellStateEnum.Source) {
      store.dispatch(updatePathFindingSourceState((source = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: 0, columnIndex: 0, distance: 0 })));
    }
    if (internalGrid[droppedCell[0]][droppedCell[1]].cellState === PathFindingCellStateEnum.Destination) {
      store.dispatch(updatePathFindingDestinationState((destination = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: 0, columnIndex: 0, distance: 0 })));
    }

    internalGrid[droppedCell[0]][droppedCell[1]] = {
      ...internalGrid[droppedCell[0]][droppedCell[1]],
      cellState: store.getState().pathFindingModuleState.pathFindingSelectedCellDragging,
    };
    store.dispatch(updatePathFindingGridState(internalGrid));
    store.dispatch(updatePathFindingSelectedCellDraggingState(PathFindingCellDraggingStateEnum.None));
    movedCell.current.style.opacity = '1';
  }

  internalGrid = [];
};
const initializeInternalGrid = () => {
  if (store.getState().animationState.hasAnimationStarted) return;

  internalGrid = store.getState().pathFindingModuleState.pathFindingGrid.map((row) => [...row]);
};

const CellActionItemLegend = ({ cellActionState }: CellActionItemProps) => {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        width: 10px;
        height: 10px;
        top: 5px;
        margin-right: 5px;
        ::before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          height: 10px;
          width: 10px;
          background-color: ${getCellColor(cellActionState)};
        }
      `}
    ></div>
  );
};

const CellActionItem = ({ cellActionState }: CellActionItemProps) => {
  const animationState = useSelector((state: AppState) => state.animationState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();

  const isCellActionItemEnabled = (): boolean => {
    if (animationState.hasAnimationStarted) return false;
    if (cellActionState !== PathFindingCellActionStateEnum.Source && cellActionState !== PathFindingCellActionStateEnum.Destination) return true;
    if (cellActionState === PathFindingCellActionStateEnum.Source && pathFindingState.pathFindingSource.cellState === PathFindingCellStateEnum.Unselected) return true;
    if (cellActionState === PathFindingCellActionStateEnum.Destination && pathFindingState.pathFindingDestination.cellState === PathFindingCellStateEnum.Unselected)
      return true;

    return false;
  };
  const handleClick = () => {
    if (!isCellActionItemEnabled()) return;

    if (pathFindingState.pathFindingSelectedCellAction === cellActionState) dispatch(updatePathFindingSelectedCellActionState(PathFindingCellActionStateEnum.None));
    else dispatch(updatePathFindingSelectedCellActionState(cellActionState));
  };

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        width: 22px;
        height: 22px;
        background-color: ${pathFindingState.pathFindingSelectedCellAction === cellActionState ? '#71a1f5' : 'transparent'};
        cursor: ${isCellActionItemEnabled() ? 'pointer' : 'default'};
        opacity: ${isCellActionItemEnabled() ? '1' : '0.5'};
        :hover {
          ${isCellActionItemEnabled() &&
          `
            background-color: ${pathFindingState.pathFindingSelectedCellAction === cellActionState ? '#71a1f5' : headerItemHovered};
          `}
        }
        ::before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          top: 3px;
          left: 3px;
          height: 16px;
          width: 16px;
          background-color: ${getCellColor(cellActionState)};
        }
      `}
      onClick={handleClick}
    ></div>
  );
};

const CellActions = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        width: 97px;
      `}
    >
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Source} />
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Destination} />
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Wall} />
      <CellActionItem cellActionState={PathFindingCellActionStateEnum.Unselected} />
    </div>
  );
};

const PathFindingCellComponent = ({ cellState = PathFindingCellStateEnum.Unselected, rowIndex, columnIndex }: IPathFindingCellProps) => {
  const animationState = useSelector((state: AppState) => state.animationState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pathFindingAlgorithmManager.cellsRefs[rowIndex][columnIndex] = cellRef;
  }, []);

  const getCursor = (): string => {
    if (animationState.hasAnimationStarted) return 'cursor';
    if (pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Unselected && cellState === PathFindingCellStateEnum.Unselected)
      return 'cursor';
    if (pathFindingState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None) return 'pointer';
    if (pathFindingState.pathFindingSelectedCellDragging !== PathFindingCellDraggingStateEnum.None) return 'pointer';
    if (cellState !== PathFindingCellStateEnum.Unselected) return 'pointer';

    return 'cursor';
  };
  const getHoverStyle = (): string => {
    let style: string = '';
    if (animationState.hasAnimationStarted) return style;

    if (pathFindingState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None) {
      if (pathFindingState.pathFindingSelectedCellAction === cellState) return style;

      style = `
        background-color: ${getCellColor(pathFindingState.pathFindingSelectedCellAction)};
        opacity: 0.3;
      `;
      return style;
    }
    if (pathFindingState.pathFindingSelectedCellDragging !== PathFindingCellDraggingStateEnum.None) {
      style = `
        background-color: ${getCellColor(pathFindingState.pathFindingSelectedCellDragging)};
        opacity: 0.3;
      `;
      return style;
    }

    return style;
  };
  const initiateGridStateUpdate = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (pathFindingState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None) {
      initializeInternalGrid();
      paintCell();
      return;
    }
    if (cellState !== PathFindingCellStateEnum.Unselected) {
      if (cellRef.current === null) return;

      initializeInternalGrid();
      internalGrid[rowIndex][columnIndex] = { ...internalGrid[rowIndex][columnIndex], cellState: PathFindingCellStateEnum.Unselected };
      cellRef.current.style.opacity = '0.3';
      movedCell = cellRef;
      droppedCell = [rowIndex, columnIndex];
      dispatch(updatePathFindingSelectedCellDraggingState(cellState as PathFindingCellDraggingStateEnum));
    }
  };
  const paintCell = () => {
    if (cellRef.current === null) return;
    if (cellState === pathFindingState.pathFindingSelectedCellAction) return;

    if (cellState === PathFindingCellStateEnum.Source) source = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: 0, columnIndex: 0, distance: 0 };
    if (cellState === PathFindingCellStateEnum.Destination) destination = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: 0, columnIndex: 0, distance: 0 };

    internalGrid[rowIndex][columnIndex] = { ...internalGrid[rowIndex][columnIndex], cellState: pathFindingState.pathFindingSelectedCellAction };
    pathFindingAlgorithmManager.cellsRefs[rowIndex][columnIndex].current!.style.backgroundColor = getCellColor(pathFindingState.pathFindingSelectedCellAction);

    if (pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Source) {
      source = internalGrid[rowIndex][columnIndex];
      dispatch(updatePathFindingSelectedCellActionState(PathFindingCellActionStateEnum.None));
    }
    if (pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Destination) {
      destination = internalGrid[rowIndex][columnIndex];
      dispatch(updatePathFindingSelectedCellActionState(PathFindingCellActionStateEnum.None));
    }
  };
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) return;

    if (pathFindingState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None) {
      paintCell();
      return;
    }
    if (pathFindingState.pathFindingSelectedCellDragging !== PathFindingCellDraggingStateEnum.None) {
      droppedCell = [rowIndex, columnIndex];
    }
  };

  return (
    <div
      css={css`
        box-sizing: border-box;
        height: ${cellSize}px;
        width: ${cellSize}px;
        outline: 0.5px solid black;
        border: 0.5px solid black;
        background-color: ${getCellColor(cellState)};
        cursor: ${getCursor()};
        :hover {
          ${getHoverStyle()}
        }
      `}
      ref={cellRef}
      onMouseOver={handleMouseOver}
      onMouseDown={initiateGridStateUpdate}
      onMouseUp={setNewGridState}
    ></div>
  );
};

const SettingsComponent = () => {
  const windowState = useSelector((state: AppState) => state.windowState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();

  let arrayLength = minAnimationContainerHeight / cellSize;
  let rowLength = getCellsInRowCount(windowState.windowWidth);

  const resetGrid = () => {
    let grid: IPathFindingCellProps[][] = new Array(arrayLength);
    rowLength = getCellsInRowCount(windowState.windowWidth);
    for (let i = 0; i < arrayLength; i++) {
      grid[i] = new Array(rowLength);
      for (let j = 0; j < rowLength; j++) {
        grid[i][j] = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: i, columnIndex: j, distance: 0 };
      }
    }

    grid[Math.floor(grid.length / 2 - 3)][Math.floor(rowLength / 2 - 5)].cellState = PathFindingCellStateEnum.Source;
    grid[Math.round(grid.length / 2 + 3)][Math.round(rowLength / 2 + 5)].cellState = PathFindingCellStateEnum.Destination;
    dispatch(updatePathFindingSourceState((source = grid[Math.round(grid.length / 2 + 3)][Math.round(rowLength / 2 + 5)])));
    dispatch(updatePathFindingDestinationState((destination = grid[Math.floor(grid.length / 2 - 3)][Math.floor(rowLength / 2 - 5)])));

    for (let i = 3; i < grid.length - 3; i++) {
      grid[i][Math.round(rowLength / 2)].cellState = PathFindingCellStateEnum.Wall;
    }
    minAnimationComponentWidth = windowState.windowWidth;
    dispatch(updatePathFindingGridState(grid));

    if (
      pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Source ||
      pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Destination
    ) {
      dispatch(updatePathFindingSelectedCellActionState(PathFindingCellActionStateEnum.None));
    }
  };

  useEffect(() => {
    pathFindingAlgorithmManager.cellsRefs = new Array(arrayLength);
    rowLength = getCellsInRowCount(windowState.windowWidth);

    for (let i = 0; i < arrayLength; i++) {
      pathFindingAlgorithmManager.cellsRefs[i] = new Array(rowLength);
    }
    resetGrid();
  }, []);

  return (
    <div
      css={css`
        margin: 0px 10px;
        height: 26%;
        min-height: 200px;
        display: block;
      `}
    >
      <div
        css={css`
          height: 20%;
          min-height: 40px;
        `}
      >
        Path Finding
      </div>
      <div
        css={css`
          height: 80%;
          min-height: 118px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        `}
      >
        <div>
          <CellActions />
          <div>
            <div
              css={css`
                display: flex;
                color: white;
                font-size: 13px;
                font-weight: bold;
                margin-left: 3px;
              `}
            >
              <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Source} />
              <div
                css={css`
                  margin-right: 5px;
                `}
              >
                Source;
              </div>
              <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Destination} />
              <div
                css={css`
                  margin-right: 5px;
                `}
              >
                Destination;
              </div>
              <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Wall} />
              <div
                css={css`
                  margin-right: 5px;
                `}
              >
                Wall;
              </div>
              <CellActionItemLegend cellActionState={PathFindingCellActionStateEnum.Unselected} />
              <div
                css={css`
                  margin-right: 5px;
                `}
              >
                Empty cell
              </div>
            </div>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              width: 200px;
            `}
          >
            <animationContext.Provider value={{ animationManager: pathFindingAnimationManager }}>
              <ActionBar />
            </animationContext.Provider>
            <ResetButton resetFunction={resetGrid} />
          </div>

          <WarningMessageComponent message={pathFindingState.pathFindingWarningMessage} />
        </div>
      </div>
    </div>
  );
};

const AnimationComponent = () => {
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);

  return (
    <div
      css={css`
        height: 74%;
      `}
    >
      <div
        css={css`
          height: 6%;
          margin-left: 10px;
        `}
      >
        <algorithmContext.Provider value={{ algorithmManager: pathFindingAlgorithmManager }}>
          <AlgorithmsList data={pathFindingAlgorithmsData} />
        </algorithmContext.Provider>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background-color: ${moduleBackground};
          height: 94%;
          min-height: 500px;
          min-width: ${minAnimationComponentWidth}px;
        `}
      >
        <div
          css={css`
            display: flex;
            height: 70%;
            min-height: ${minAnimationContainerHeight}px;
            justify-content: center;
            align-items: flex-end;
          `}
        >
          <div onMouseLeave={setNewGridState} onMouseEnter={initializeInternalGrid}>
            {pathFindingState.pathFindingGrid.map((row, rowIndex) => (
              <div
                css={css`
                  display: flex;
                `}
                key={rowIndex}
              >
                {row.map((cellState, columnIndex) => (
                  <PathFindingCellComponent key={columnIndex} cellState={cellState.cellState} rowIndex={rowIndex} columnIndex={columnIndex} distance={0} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
          `}
        >
          <animationContext.Provider value={{ animationManager: pathFindingAnimationManager }}>
            <SliderComponent />
          </animationContext.Provider>
        </div>
      </div>
    </div>
  );
};

export const PathFindingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(updateWindowWidthStateAction(window.innerWidth));
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div
      css={css`
        color: ${mainFontColor};
        font-size: 30px;
        text-align: left;
        overflow: auto;
        height: 100%;
      `}
    >
      <SettingsComponent />
      <AnimationComponent />
    </div>
  );
};
