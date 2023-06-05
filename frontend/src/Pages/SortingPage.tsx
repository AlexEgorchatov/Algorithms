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
        <SortingInput />
        <AlgorithmsList data={sortingAlgorithms} selectedAlgorithm={algorithmState.initialSortingAlgorithm} dispatch={dispatch} />
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
