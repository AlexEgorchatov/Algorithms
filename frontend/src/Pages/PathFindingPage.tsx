/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { checkedColor, completionColor, headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { algorithmContext, animationContext, minAppWidth } from '../Core/Helper';
import { ActionBar } from '../Components/ActionBar';
import { ResetButton } from '../Components/ResetButton';
import { pathFindingAlgorithmsData } from '../Core/Data/PathFindingData';
import { AnimationManager } from '../Core/Other/AnimationManager';
import { PathFindingAlgorithmsManager } from '../Core/Other/PathFindingAlgorithmsManager';
import { AlgorithmsList } from '../Components/AlgorithmsList';
import { SliderComponent } from '../Components/Slider';
import { useEffect } from 'react';
import { PathFindingCellStateEnum } from '../Resources/Enumerations';
import { useDispatch, useSelector } from 'react-redux';
import { updateWindowWidthStateAction } from '../Store/Shared/WindowStateManagement';
import { AppState } from '../Store/Store';
import { IPathFindingCellProps } from '../Core/Interfaces/IPathFindingCellProps';
import { updatePathFindingCellActionState, updatePathFindingGridState } from '../Store/Path Finding Module/PathFindingModuleStateManagement';
import { WarningMessageComponent } from '../Components/WarningMessage';

let pathFindingAlgorithmManager: PathFindingAlgorithmsManager = new PathFindingAlgorithmsManager(pathFindingAlgorithmsData[0].algorithm);
let pathFindingAnimationManager: AnimationManager = new AnimationManager(pathFindingAlgorithmManager);
let minAnimationComponentWidth: number = 0;

const cellSize: number = 25;
const getCellsInRowCount = (windowWidth: number): number => {
  return Math.floor((Math.max(windowWidth, minAppWidth) - cellSize) / cellSize);
};
const getCellColor = (cellState: PathFindingCellStateEnum) => {
  switch (cellState) {
    case PathFindingCellStateEnum.Unselected:
      return 'white';

    case PathFindingCellStateEnum.Checked:
      return checkedColor;

    case PathFindingCellStateEnum.Source:
      return 'green';

    case PathFindingCellStateEnum.Destination:
      return 'red';

    case PathFindingCellStateEnum.Wall:
      return 'gray';

    case PathFindingCellStateEnum.Path:
      return completionColor;

    case PathFindingCellStateEnum.None:
    default:
      return 'transparent';
  }
};

interface CellActionItemProps {
  cellActionState: PathFindingCellStateEnum;
}

const CellActionItem = ({ cellActionState }: CellActionItemProps) => {
  const animationState = useSelector((state: AppState) => state.animationState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isCellActionItemEnabled()) return;

    if (pathFindingState.pathFindingCellAction === cellActionState) dispatch(updatePathFindingCellActionState(PathFindingCellStateEnum.None));
    else dispatch(updatePathFindingCellActionState(cellActionState));
  };
  const isCellActionItemEnabled = (): boolean => {
    if (animationState.hasAnimationStarted) return false;
    if (cellActionState !== PathFindingCellStateEnum.Source && cellActionState !== PathFindingCellStateEnum.Destination) return true;
    if (cellActionState === PathFindingCellStateEnum.Source && !pathFindingState.doesSourceExist) return true;
    if (cellActionState === PathFindingCellStateEnum.Destination && !pathFindingState.doesDestinationExist) return true;

    return false;
  };

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        width: 22px;
        height: 22px;
        background-color: ${pathFindingState.pathFindingCellAction === cellActionState ? '#71a1f5' : 'transparent'};
        cursor: ${isCellActionItemEnabled() ? 'pointer' : 'default'};
        opacity: ${isCellActionItemEnabled() ? '1' : '0.5'};
        :hover {
          ${isCellActionItemEnabled() &&
          `
            background-color: ${pathFindingState.pathFindingCellAction === cellActionState ? '#71a1f5' : headerItemHovered};
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
      <CellActionItem cellActionState={PathFindingCellStateEnum.Source} />
      <CellActionItem cellActionState={PathFindingCellStateEnum.Destination} />
      <CellActionItem cellActionState={PathFindingCellStateEnum.Wall} />
      <CellActionItem cellActionState={PathFindingCellStateEnum.Unselected} />
    </div>
  );
};

const PathFindingCellComponent = ({ cellState = PathFindingCellStateEnum.Unselected }: IPathFindingCellProps) => {
  const animationState = useSelector((state: AppState) => state.animationState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();

  const getCursor = (): string => {
    if (animationState.hasAnimationStarted) return 'cursor';
    if (pathFindingState.pathFindingCellAction === PathFindingCellStateEnum.None) return 'cursor';

    return 'pointer';
  };
  const getHoverStyle = (): string => {
    if (animationState.hasAnimationStarted) return ``;
    if (pathFindingState.pathFindingCellAction === PathFindingCellStateEnum.None) return ``;

    const transparentColor = getCellColor(pathFindingState.pathFindingCellAction).replace(')', ', 0.5)').replace('rgb', 'rgba');

    let style: string = `
      background-color: ${transparentColor};
    `;
    return style;
  };
  const handleMouseEnter = () => {};

  return (
    <div
      css={css`
        height: ${cellSize}px;
        width: ${cellSize}px;
        border: 1px;
        border-color: black;
        border-style: solid;
        margin: -1px;
        background-color: ${getCellColor(cellState)};
        cursor: ${getCursor()};
        :hover {
          ${getHoverStyle()}
        }
      `}
      onMouseEnter={handleMouseEnter}
    ></div>
  );
};

const SettingsComponent = () => {
  const windowState = useSelector((state: AppState) => state.windowState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();

  const resetGrid = () => {
    let grid: IPathFindingCellProps[][] = new Array(425 / cellSize);
    let arrayLength = getCellsInRowCount(windowState.windowWidth);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(arrayLength);
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = { cellState: PathFindingCellStateEnum.Unselected, rowIndex: i, columnIndex: j };
      }
    }
    grid[Math.floor(grid.length / 2 - 3)][Math.floor(arrayLength / 2 - 5)].cellState = PathFindingCellStateEnum.Source;
    grid[Math.round(grid.length / 2 + 3)][Math.round(arrayLength / 2 + 5)].cellState = PathFindingCellStateEnum.Destination;
    for (let i = 3; i < grid.length - 3; i++) {
      grid[i][Math.round(arrayLength / 2)].cellState = PathFindingCellStateEnum.Wall;
    }
    minAnimationComponentWidth = windowState.windowWidth;

    dispatch(updatePathFindingGridState(grid));
  };

  useEffect(() => {
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
        <CellActions />
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
            min-height: 425px;
            justify-content: center;
            align-items: flex-end;
          `}
        >
          <div>
            {pathFindingState.pathFindingGrid.map((row, rowIndex) => (
              <div
                css={css`
                  display: flex;
                `}
                key={rowIndex}
              >
                {row.map((cellState, columnIndex) => (
                  <PathFindingCellComponent key={columnIndex} cellState={cellState.cellState} rowIndex={rowIndex} columnIndex={columnIndex} />
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
