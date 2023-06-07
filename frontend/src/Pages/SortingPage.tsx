/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { Dispatch } from 'react';
import { headerItemHovered, mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingEnumeration, SortingData, sortingAlgorithms } from '../Resources/Sorting Page Resources/SortingData';
import { useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { useDispatch } from 'react-redux';
import { updatingSortingAlgorithmStateAction } from '../Store/Sorting Page/SortingAlgorithmStateManagement';
import { AnyAction } from 'redux';
import { updatingPauseVisibilityStateAction } from '../Store/Shared/SliderComponentStateManagement';

interface AlgorithmListProps {
  data: SortingData[];
  selectedAlgorithm: SortingEnumeration;
  dispatch: Dispatch<AnyAction>;
}

interface AlgorithmProps {
  title: string;
  isSelected: boolean;
  onClick: React.MouseEventHandler;
}

const SortingInput = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: baseline;
      `}
    >
      <div
        css={css`
          font-size: 24px;
          color: white;
          margin-right: 10px;
        `}
      >
        Input
      </div>
      <div
        css={css`
          display: grid;
          width: 99%;
        `}
      >
        <input
          css={css`
            height: 20px;
            font-size: 16px;
            width: 99%;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
            ::placeholder {
              font-size: 16px;
              font-style: italic;
            }
          `}
          type="text"
          placeholder="Type several numbers..."
        />
        <div
          css={css`
            color: white;
            font-size: 14px;
          `}
        >
          Ex: "12 32 89 29". Maximum number of elements is 25. Difference between minimum and maximum values should be less than
          200
        </div>
      </div>
    </div>
  );
};

const Algorithm = ({ title, isSelected, onClick }: AlgorithmProps) => {
  return (
    <div
      css={css`
        cursor: pointer;
        font-size: 20px;
        color: ${isSelected ? '' : 'white'};
        margin-right: 10px;
        :hover {
          color: ${!isSelected ? `${headerItemHovered}` : ''};
        }
      `}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

const AlgorithmsList = ({ data, selectedAlgorithm, dispatch }: AlgorithmListProps) => {
  return (
    <div
      css={css`
        width: 99%;
        display: flex;
      `}
    >
      {data.map((algorithm) => (
        <Algorithm
          key={algorithm.sortingType}
          title={algorithm.title}
          isSelected={algorithm.sortingType === selectedAlgorithm}
          onClick={() => dispatch(updatingSortingAlgorithmStateAction(algorithm.sortingType))}
        />
      ))}
    </div>
  );
};

const RefreshButton = () => {
  return (
    <div
      css={css`
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        position: relative;
        display: flex;
        transform: scale(var(--ggs, 1));
        width: 22px;
        height: 22px;
        border: 2px solid;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        :hover {
          color: ${headerItemHovered};
          & > div {
            color: ${headerItemHovered};
          }
        }
      `}
    >
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          display: block;
          transform: scale(var(--ggs, 1));
          width: 12px;
          height: 12px;
          border: 2px solid;
          border-right-color: transparent;
          border-radius: 100px;
          color: white;
          ::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 6px;
            height: 6px;
            border-top: 2px solid;
            border-right: 2px solid;
            top: -3px;
            right: -1px;
            transform: rotate(68deg);
          }
        `}
      ></div>
    </div>
  );
};

const PlayButton = () => {
  const sliderState = useSelector((state: AppState) => state.sliderComponentState);
  const dispatch = useDispatch();

  return (
    <div>
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          display: ${sliderState.initialPauseVisible ? 'none' : 'flex'};
          width: 22px;
          height: 22px;
          border: 2px solid;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          :hover {
            color: ${headerItemHovered};
          }
          ::before {
            content: '';
            display: block;
            box-sizing: border-box;
            position: absolute;
            width: 0;
            height: 10px;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 6px solid;
            top: 4px;
            left: 7px;
          }
        `}
        onClick={() => dispatch(updatingPauseVisibilityStateAction(true))}
      ></div>
      <div
        css={css`
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          position: relative;
          display: ${sliderState.initialPauseVisible ? 'flex' : 'none'};
          width: 22px;
          height: 22px;
          border: 2px solid;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          :hover {
            color: ${headerItemHovered};
            & > div {
              color: ${headerItemHovered};
            }
          }
        `}
        onClick={() => dispatch(updatingPauseVisibilityStateAction(false))}
      >
        <div
          css={css`
            box-sizing: border-box;
            position: relative;
            transform: scale(var(--ggs, 1));
            width: 10px;
            height: 12px;
            border-left: 4px solid;
            border-right: 4px solid;
            color: white;
          `}
        ></div>
      </div>
    </div>
  );
};

const GenerateInputButton = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
      `}
    >
      <div
        css={css`
          box-sizing: border-box;
          position: relative;
          align-items: center;
          display: flex;
          height: 22px;
          font-size: 16px;
          transform: scale(var(--ggs, 1));
          border: 2px solid;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          :hover {
            color: ${headerItemHovered};
          }
        `}
      >
        Generate #
      </div>
      <input
        css={css`
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        `}
        type="text"
      />
    </div>
  );
};

const AlgorithmControls = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        width: 350px;
      `}
    >
      <PlayButton />
      <RefreshButton />
      <GenerateInputButton />
    </div>
  );
};

export const SortingPage = () => {
  const algorithmState = useSelector((state: AppState) => state.sortingAlgorithmState);
  const dispatch = useDispatch();

  return (
    <div
      css={css`
        color: ${mainFontColor};
        font-size: 36px;
        text-align: left;
      `}
    >
      <div
        css={css`
          padding: 10px;
        `}
      >
        Sorting
        <div
          css={css`
            height: 120px;
            display: grid;
            align-content: space-between;
          `}
        >
          <SortingInput />
          <AlgorithmControls />
          <AlgorithmsList
            data={sortingAlgorithms}
            selectedAlgorithm={algorithmState.initialSortingAlgorithm}
            dispatch={dispatch}
          />
        </div>
      </div>
      <div
        css={css`
          background-color: ${moduleBackground};
        `}
      >
        <div
          css={css`
            height: 400px;
          `}
        ></div>
        <SliderComponent />
      </div>
    </div>
  );
};
