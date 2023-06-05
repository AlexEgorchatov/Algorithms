/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingEnumeration, SortingData, sortingAlgorithms } from '../Resources/Sorting Page Resources/SortingData';

interface Props {
  data: SortingData[];
  selectedAlgorithm: SortingEnumeration;
  setState: React.Dispatch<React.SetStateAction<SortingEnumeration>>;
}

interface AlgoProps {
  algorithm: SortingData;
  isSelected: boolean;
  onClick: React.MouseEventHandler;
}

const Algorithm = ({ algorithm, isSelected, onClick }: AlgoProps) => {
  return (
    <div
      css={css`
        cursor: pointer;
        background-color: ${isSelected ? 'red' : 'blue'};
      `}
      onClick={onClick}
    >
      {algorithm.title}
    </div>
  );
};

const AlgorithmsList = ({ data, selectedAlgorithm, setState }: Props) => {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      {data.map((algorithm) => (
        <Algorithm
          key={algorithm.sortingType}
          algorithm={algorithm}
          isSelected={algorithm.sortingType === selectedAlgorithm}
          onClick={() => setState(algorithm.sortingType)}
        />
      ))}
      {selectedAlgorithm}
    </div>
  );
};

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

export const SortingPage = () => {
  let [selectedAlgorithm, setSelectedAlgorithm] = React.useState<SortingEnumeration>(SortingEnumeration.BubbleSort);

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
        <div
          css={css`
            height: 50px;
            font-size: 16px;
            background-color: gray;
          `}
        ></div>
        <AlgorithmsList data={sortingAlgorithms} selectedAlgorithm={selectedAlgorithm} setState={setSelectedAlgorithm} />
      </div>
      <div
        css={css`
          background-color: ${moduleBackground};
        `}
      >
        <div
          css={css`
            height: 400px;
            background-color: gainsboro;
          `}
        ></div>
        <SliderComponent />
      </div>
    </div>
  );
};
