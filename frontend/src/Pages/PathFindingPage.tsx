/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { mainFontColor, moduleBackground } from '../Resources/Colors';
import { algorithmContext, animationContext, isTouchDevice } from '../Core/Helpers/GeneralHelper';
import { ActionBar } from '../Components/Shared Components/ActionBar';
import { ResetButton } from '../Components/Shared Components/ResetButton';
import { pathFindingAlgorithmsData } from '../Core/Data/PathFindingData';
import { AnimationManager } from '../Core/Other/AnimationManager';
import {
  PathFindingAlgorithmsManager,
  getCellColor,
  resetCellsRefsBackground,
  undefinedCell,
} from '../Core/Other/PathFindingAlgorithmsManager';
import { AlgorithmsList } from '../Components/Shared Components/AlgorithmsList';
import { SliderComponent } from '../Components/Shared Components/Slider';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateWindowHeightStateAction,
  updateWindowWidthStateAction,
} from '../Redux/Shared/WindowStateManagement';
import { AppState, store } from '../Redux/Store';
import { IPathFindingCellProps } from '../Core/Interfaces/IPathFindingCellProps';
import {
  updatePathFindingSelectedCellActionState,
  updatePathFindingGridState,
  updatePathFindingSourceState,
  updatePathFindingDestinationState,
  updatePathFindingSelectedCellDraggingState,
  updatePathFindingWarningMessageState,
} from '../Redux/Path Finding Module/PathFindingModuleStateManagement';
import { WarningMessageComponent } from '../Components/Shared Components/WarningMessage';
import {
  PathFindingCellActionStateEnum,
  PathFindingCellDraggingStateEnum,
  PathFindingCellStateEnum,
} from '../Resources/Enumerations';
import { updateCanAnimationBeStartedStateAction } from '../Redux/Shared/AnimationStateManagement';
import {
  headerFooterHeight,
  minAppWidth,
  settingsComponentHeight,
  algorithmsListComponentHeight,
  animationEmptySpaceHeight,
} from '../Resources/Constants';
import { CellActions } from '../Components/Page Components/Path Finding Components/Actions';
import { CellActionLegends } from '../Components/Page Components/Path Finding Components/Legends';

let pathFindingAlgorithmManager: PathFindingAlgorithmsManager = new PathFindingAlgorithmsManager(
  pathFindingAlgorithmsData[0].algorithm,
);
let pathFindingAnimationManager: AnimationManager = new AnimationManager(
  pathFindingAlgorithmManager,
);
let minAnimationComponentWidth: number = 0;
let minAnimationComponentHeight: number = 0;
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

  let dispatch = store.dispatch;
  let pathFindingModuleState = store.getState().pathFindingModuleState;

  if (
    (pathFindingModuleState.pathFindingSelectedCellDragging ===
      PathFindingCellDraggingStateEnum.None &&
      pathFindingModuleState.pathFindingSelectedCellAction ===
        PathFindingCellActionStateEnum.None) ||
    (pathFindingModuleState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None &&
      !pathFindingAlgorithmManager.cellsRefs.some((row) =>
        row.some((cell) => cell.current!.style.backgroundColor !== ``),
      ))
  ) {
    return;
  }

  if (
    pathFindingModuleState.pathFindingSelectedCellDragging === PathFindingCellDraggingStateEnum.None
  ) {
    dispatch(updatePathFindingGridState(internalGrid));
    resetCellsRefsBackground(pathFindingAlgorithmManager.cellsRefs);

    dispatch(updatePathFindingSourceState(source));
    dispatch(updatePathFindingDestinationState(destination));
    if (
      pathFindingModuleState.pathFindingSelectedCellAction ===
        PathFindingCellActionStateEnum.Source ||
      pathFindingModuleState.pathFindingSelectedCellAction ===
        PathFindingCellActionStateEnum.Destination
    ) {
      dispatch(updatePathFindingSelectedCellActionState(PathFindingCellActionStateEnum.None));
    }

    if (source === undefinedCell && destination === undefinedCell) {
      dispatch(
        updatePathFindingWarningMessageState(
          'Source and Destination are not set, animation is disabled',
        ),
      );
    } else if (source === undefinedCell) {
      dispatch(updatePathFindingWarningMessageState('Source is not set, animation is disabled'));
    } else {
      dispatch(
        updatePathFindingWarningMessageState('Destination is not set, animation is disabled'),
      );
    }
  } else {
    if (movedCell.current === null) return;

    if (
      internalGrid[droppedCell[0]][droppedCell[1]].cellState === PathFindingCellStateEnum.Source
    ) {
      dispatch(updatePathFindingSourceState((source = undefinedCell)));
    }
    if (
      internalGrid[droppedCell[0]][droppedCell[1]].cellState ===
      PathFindingCellStateEnum.Destination
    ) {
      dispatch(updatePathFindingDestinationState((destination = undefinedCell)));
    }

    internalGrid[droppedCell[0]][droppedCell[1]] = {
      ...internalGrid[droppedCell[0]][droppedCell[1]],
      cellState: store.getState().pathFindingModuleState.pathFindingSelectedCellDragging,
    };

    dispatch(updatePathFindingGridState(internalGrid));
    dispatch(updatePathFindingSelectedCellDraggingState(PathFindingCellDraggingStateEnum.None));
    movedCell.current.style.opacity = '1';

    if (
      internalGrid[droppedCell[0]][droppedCell[1]].cellState === PathFindingCellStateEnum.Source
    ) {
      dispatch(
        updatePathFindingSourceState((source = internalGrid[droppedCell[0]][droppedCell[1]])),
      );
    }
    if (
      internalGrid[droppedCell[0]][droppedCell[1]].cellState ===
      PathFindingCellStateEnum.Destination
    ) {
      dispatch(
        updatePathFindingDestinationState(
          (destination = internalGrid[droppedCell[0]][droppedCell[1]]),
        ),
      );
    }
  }

  if (source === undefinedCell && destination === undefinedCell) {
    dispatch(
      updatePathFindingWarningMessageState(
        'Source and Destination are not set, animation is disabled',
      ),
    );
    dispatch(updateCanAnimationBeStartedStateAction(false));
  } else if (source === undefinedCell) {
    dispatch(updatePathFindingWarningMessageState('Source is not set, animation is disabled'));
    dispatch(updateCanAnimationBeStartedStateAction(false));
  } else if (destination === undefinedCell) {
    dispatch(updatePathFindingWarningMessageState('Destination is not set, animation is disabled'));
    dispatch(updateCanAnimationBeStartedStateAction(false));
  } else {
    dispatch(updateCanAnimationBeStartedStateAction(true));
  }

  internalGrid = [];
};
const initializeInternalGrid = () => {
  if (store.getState().animationState.hasAnimationStarted) return;

  internalGrid = store.getState().pathFindingModuleState.pathFindingGrid.map((row) => [...row]);
};
const isInteractableCell = (cellState: PathFindingCellStateEnum): boolean => {
  return (
    cellState !== PathFindingCellStateEnum.Unselected &&
    cellState !== PathFindingCellStateEnum.Path &&
    cellState !== PathFindingCellStateEnum.Checked
  );
};

const PathFindingCellComponent = ({
  cellState = PathFindingCellStateEnum.Unselected,
  rowIndex,
  columnIndex,
}: IPathFindingCellProps) => {
  const animationState = useSelector((state: AppState) => state.animationState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pathFindingAlgorithmManager.cellsRefs[rowIndex][columnIndex] = cellRef;
  }, [pathFindingAlgorithmManager.cellsRefs]);

  const getCursor = (): string => {
    if (animationState.hasAnimationStarted) return 'default';
    if (pathFindingState.pathFindingSelectedCellAction === cellState) return 'default';
    if (pathFindingState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None)
      return 'pointer';
    if (pathFindingState.pathFindingSelectedCellDragging !== PathFindingCellDraggingStateEnum.None)
      return 'pointer';
    if (isInteractableCell(cellState as PathFindingCellStateEnum)) return 'pointer';

    return 'default';
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
    if (
      pathFindingState.pathFindingSelectedCellDragging !== PathFindingCellDraggingStateEnum.None
    ) {
      style = `
        background-color: ${getCellColor(pathFindingState.pathFindingSelectedCellDragging)};
        opacity: 0.3;
      `;
      return style;
    }

    return style;
  };
  const initiateGridStateUpdate = (event: React.MouseEvent<HTMLDivElement>) => {
    if (store.getState().animationState.hasAnimationStarted) return;
    event.preventDefault();

    if (pathFindingState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None) {
      if (!pathFindingAlgorithmManager.isStateUpdated) {
        pathFindingAlgorithmManager.resetToInitialState();
        pathFindingAlgorithmManager.isStateUpdated = true;
      }

      initializeInternalGrid();
      paintCell();
      return;
    }
    if (isInteractableCell(cellState as PathFindingCellStateEnum)) {
      if (cellRef.current === null) return;

      if (!pathFindingAlgorithmManager.isStateUpdated) {
        pathFindingAlgorithmManager.resetToInitialState();
        pathFindingAlgorithmManager.isStateUpdated = true;
      }

      initializeInternalGrid();
      internalGrid[rowIndex][columnIndex] = {
        ...internalGrid[rowIndex][columnIndex],
        cellState: PathFindingCellStateEnum.Unselected,
      };
      cellRef.current.style.opacity = '0.3';
      movedCell = cellRef;
      droppedCell = [rowIndex, columnIndex];
      dispatch(
        updatePathFindingSelectedCellDraggingState(cellState as PathFindingCellDraggingStateEnum),
      );
    }
  };
  const paintCell = () => {
    if (cellRef.current === null) return;
    if (cellState === pathFindingState.pathFindingSelectedCellAction) return;

    if (cellState === PathFindingCellStateEnum.Source) source = undefinedCell;
    if (cellState === PathFindingCellStateEnum.Destination) destination = undefinedCell;

    internalGrid[rowIndex][columnIndex] = {
      ...internalGrid[rowIndex][columnIndex],
      cellState: pathFindingState.pathFindingSelectedCellAction,
    };
    pathFindingAlgorithmManager.cellsRefs[rowIndex][columnIndex].current!.style.backgroundColor =
      getCellColor(pathFindingState.pathFindingSelectedCellAction);

    if (pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Source) {
      source = internalGrid[rowIndex][columnIndex];
    }
    if (
      pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Destination
    ) {
      destination = internalGrid[rowIndex][columnIndex];
    }
  };
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    if (store.getState().animationState.hasAnimationStarted) return;

    if (event.buttons !== 1) return;

    if (pathFindingState.pathFindingSelectedCellAction !== PathFindingCellActionStateEnum.None) {
      if (
        pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Source &&
        source !== undefinedCell
      )
        return;
      if (
        pathFindingState.pathFindingSelectedCellAction ===
          PathFindingCellActionStateEnum.Destination &&
        destination !== undefinedCell
      )
        return;

      if (!pathFindingAlgorithmManager.isStateUpdated) {
        pathFindingAlgorithmManager.resetToInitialState();
        pathFindingAlgorithmManager.isStateUpdated = true;
      }

      paintCell();
      return;
    }
    if (
      pathFindingState.pathFindingSelectedCellDragging !== PathFindingCellDraggingStateEnum.None
    ) {
      if (!pathFindingAlgorithmManager.isStateUpdated) {
        pathFindingAlgorithmManager.resetToInitialState();
        pathFindingAlgorithmManager.isStateUpdated = true;
      }

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
        user-select: none;
        ${!isTouchDevice &&
        `
          cursor: ${getCursor()};
          :hover {
            ${getHoverStyle()}
          }
        `}
      `}
      ref={cellRef}
      onMouseDown={initiateGridStateUpdate}
      onMouseOver={handleMouseOver}
      onMouseUp={setNewGridState}
    ></div>
  );
};

const SettingsComponent = () => {
  const windowState = useSelector((state: AppState) => state.windowState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();

  const resetGrid = () => {
    minAnimationComponentWidth = windowState.windowWidth;
    minAnimationComponentHeight = Math.max(
      windowState.windowHeight -
        headerFooterHeight -
        settingsComponentHeight -
        algorithmsListComponentHeight -
        animationEmptySpaceHeight,
      250,
    );
    let arrayLength = Math.floor(minAnimationComponentHeight / cellSize);
    let rowLength = getCellsInRowCount(windowState.windowWidth);

    pathFindingAlgorithmManager.cellsRefs = new Array(arrayLength);
    let grid: IPathFindingCellProps[][] = new Array(arrayLength);
    rowLength = getCellsInRowCount(windowState.windowWidth);
    for (let i = 0; i < arrayLength; i++) {
      pathFindingAlgorithmManager.cellsRefs[i] = new Array(rowLength);

      grid[i] = new Array(rowLength);
      for (let j = 0; j < rowLength; j++) {
        grid[i][j] = {
          cellState: PathFindingCellStateEnum.Unselected,
          rowIndex: i,
          columnIndex: j,
          distance: 0,
        };
      }
    }

    grid[Math.floor(grid.length / 2 - 3)][Math.floor(rowLength / 2 - 5)].cellState =
      PathFindingCellStateEnum.Source;
    grid[Math.round(grid.length / 2 + 3)][Math.round(rowLength / 2 + 5)].cellState =
      PathFindingCellStateEnum.Destination;
    dispatch(
      updatePathFindingSourceState(
        (source = grid[Math.floor(grid.length / 2 - 3)][Math.floor(rowLength / 2 - 5)]),
      ),
    );
    dispatch(
      updatePathFindingDestinationState(
        (destination = grid[Math.round(grid.length / 2 + 3)][Math.round(rowLength / 2 + 5)]),
      ),
    );

    for (let i = 3; i < grid.length - 3; i++) {
      grid[i][Math.round(rowLength / 2)].cellState = PathFindingCellStateEnum.Wall;
    }
    dispatch(updatePathFindingGridState(grid));
    dispatch(updateCanAnimationBeStartedStateAction(true));
    pathFindingAlgorithmManager.isStateUpdated = true;

    if (
      pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Source ||
      pathFindingState.pathFindingSelectedCellAction === PathFindingCellActionStateEnum.Destination
    ) {
      dispatch(updatePathFindingSelectedCellActionState(PathFindingCellActionStateEnum.None));
    }
  };

  useEffect(() => {
    resetGrid();
  }, []);

  return (
    <div
      css={css`
        margin: 0px 10px;
        min-height: ${settingsComponentHeight}px;
        display: block;
      `}
    >
      Path Finding
      <div
        css={css`
          min-height: 118px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        `}
      >
        <div>
          <CellActions />
          <CellActionLegends />
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
              min-width: 200px;
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
        height: calc(100% - ${settingsComponentHeight}px);
      `}
    >
      <algorithmContext.Provider value={{ algorithmManager: pathFindingAlgorithmManager }}>
        <AlgorithmsList data={pathFindingAlgorithmsData} />
      </algorithmContext.Provider>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background-color: ${moduleBackground};
          height: calc(100% - ${algorithmsListComponentHeight}px);
          min-width: ${minAnimationComponentWidth}px;
          min-height: calc(${minAnimationComponentHeight}px + ${animationEmptySpaceHeight}px);
        `}
      >
        <div
          css={css`
            display: flex;
            height: calc(100% - ${animationEmptySpaceHeight}px);
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
                {row.map((cell, columnIndex) => (
                  <PathFindingCellComponent
                    key={columnIndex}
                    cellState={cell.cellState}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    distance={0}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <animationContext.Provider value={{ animationManager: pathFindingAnimationManager }}>
          <SliderComponent />
        </animationContext.Provider>
      </div>
    </div>
  );
};

export const PathFindingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      dispatch(updateWindowWidthStateAction(window.innerWidth));
      dispatch(updateWindowHeightStateAction(window.innerHeight));
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
