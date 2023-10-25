/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { checkedColor, completionColor, mainFontColor, moduleBackground } from '../Resources/Colors';
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
import { updatePathFindingGridState } from '../Store/Path Finding Module/PathFindingModuleStateManagement';

let pathFindingAlgorithmManager: PathFindingAlgorithmsManager = new PathFindingAlgorithmsManager(pathFindingAlgorithmsData[0].algorithm);
let pathFindingAnimationManager: AnimationManager = new AnimationManager(pathFindingAlgorithmManager);
let minAnimationComponentWidth: number = 0;

const cellSize: number = 25;
const getCellsInRowCount = (windowWidth: number): number => {
  return Math.floor((Math.max(windowWidth, minAppWidth) - cellSize) / cellSize);
};

const PathFindingCellComponent = ({ cellState = PathFindingCellStateEnum.Unselected }: IPathFindingCellProps) => {
  const getColor = () => {
    switch (cellState) {
      case PathFindingCellStateEnum.Unselected:
        return '#ffffff';

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
    }
  };

  return (
    <div
      css={css`
        height: ${cellSize}px;
        width: ${cellSize}px;
        border: 1px;
        border-color: black;
        border-style: solid;
        margin: -1px;
        background-color: ${getColor()};
        cursor: pointer;
      `}
    ></div>
  );
};

const SettingsComponent = () => {
  const windowState = useSelector((state: AppState) => state.windowState);
  const dispatch = useDispatch();

  const resetGrid = () => {
    let grid: IPathFindingCellProps[][] = new Array(425 / cellSize);
    let arrayLength = getCellsInRowCount(windowState.windowWidth);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(arrayLength);
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = { cellState: PathFindingCellStateEnum.Unselected };
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
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
          `}
        >
          <animationContext.Provider value={{ animationManager: pathFindingAnimationManager }}>
            <ActionBar />
          </animationContext.Provider>
          <ResetButton resetFunction={() => {}} />
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
                {row.map((cellState, cellIndex) => (
                  <PathFindingCellComponent key={cellIndex} cellState={cellState.cellState} />
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
