/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface Props {
  height: number;
}

const SortingBar = ({ height }: Props) => {
  return (
    <div
      css={css`
        background-color: white;
        width: 25px;
        height: ${height}px;
      `}
    ></div>
  );
};

const bars: number[] = [180, 100, 120, 140, 160];

export const SortingModule = () => {
  return (
    <div
      css={css`
        height: 200px;
        margin: 0px 10px 0px 10px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      `}
    >
      {bars.map((bar) => (
        <SortingBar height={bar} />
      ))}
    </div>
  );
};
