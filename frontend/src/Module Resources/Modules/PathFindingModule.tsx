/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { IModule } from '../Module';
import { ModulePlaceholder } from '../ModulePlaceHolder';

export enum CellState {
  Unselected = 0,
  Selected = 1,
  Source = 2,
  Destination = 3,
  Wall = 4,
}

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
  // let initialState: CellState[][] = [[], []];
  let initialState: CellState[] = [];
  const rowNumber: number = 7;
  const columnNumber: number = 8;
  // for (let i = 0; i < rowNumber; i++) {
  //   initialState.push([]);
  //   for (let j = 0; j < columnNumber; j++) {
  //     initialState[i].push(CellState.Unselected);
  //   }
  // }
  for (let i = 0; i < 56; i++) {
    initialState.push(CellState.Unselected);
  }
  // initialState[5][1] = CellState.Source;
  // initialState[0][7] = CellState.Destination;
  // initialState[4][4] = CellState.Wall;
  // initialState[5][4] = CellState.Wall;
  // initialState[6][4] = CellState.Wall;
  initialState[5 * 8 + 1] = CellState.Source;
  initialState[0 * 8 + 7] = CellState.Destination;
  initialState[4 * 8 + 4] = CellState.Wall;
  initialState[5 * 8 + 4] = CellState.Wall;
  initialState[6 * 8 + 4] = CellState.Wall;

  const [grid, setGrid] = React.useState(initialState);
  const gridRender = [];
  for (let i = 0; i < grid.length; i++) {
    gridRender.push(<GridCell key={i} state={grid[i]} />);
  }
  const isMouseOver = React.useRef(false);
  const timeoutID = React.useRef(-1);
  const stepTime: number = 35;
  const animationCompleteTime: number = 500;

  const resetComponentState = () => {
    setGrid(initialState);
  };

  const awaitCancellation = (resolve: (parameter: unknown) => void, awaitTime: number) => {
    timeoutID.current = window.setTimeout(resolve, awaitTime);
  };

  const handleModuleMouseEnter = async () => {
    let gridCopy = [...grid];
    isMouseOver.current = true;
    let rowSource: number = 5;
    let columnSource: number = 2;
    let rowDestination: number = 0;

    while (rowSource !== rowDestination) {
      while (true) {
        // gridCopy[rowSource][columnSource] = CellState.Selected;
        gridCopy[rowSource * 8 + columnSource] = CellState.Selected;
        setGrid(gridCopy);
        await new Promise((resolve) => awaitCancellation(resolve, stepTime));
        gridCopy = [...gridCopy];

        console.log(`set cell ${rowSource} ${columnSource}`);

        // if (columnSource + 1 >= columnNumber || grid[rowSource][columnSource + 1] === CellState.Wall) break;
        if (columnSource + 1 >= columnNumber || grid[rowSource * 8 + columnSource + 1] === CellState.Wall) break;
        else columnSource++;
      }

      if (rowSource - 1 === rowDestination) {
        await new Promise((resolve) => awaitCancellation(resolve, animationCompleteTime));
        resetComponentState();
        rowSource = 5;
        columnSource = 2;
        await new Promise((resolve) => awaitCancellation(resolve, stepTime * 4));
        gridCopy = [...grid];
      } else rowSource--;
    }
  };

  const handleModuleMouseLeave = () => {
    isMouseOver.current = false;
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
          {/* {grid.map(function (row) {
            return row.map(function (state) {
              return <GridCell state={state} />;
            });
          })} */}
          {gridRender}
        </div>
      </ModulePlaceholder>
    </div>
  );
};
