/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { IModule } from '../IModule';
import { ModulePlaceholder } from '../ModulePlaceHolder';

interface Props {
  height: number;
}

const SortingBar = ({ height }: Props) => {
  useEffect(() => {
    console.log(`height ${height}`);
  }, [height]);
  return (
    <div
      css={css`
        background-color: white;
        width: 25px;
        height: ${height}px;
        position: relative;
      `}
    ></div>
  );
};

export const SortingModule = ({ title }: IModule) => {
  const [heights, setHeights] = React.useState<number[]>([180, 120, 100, 140, 160]);
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const test = async () => {
    await sleep(2000);
  };

  const handleModuleMouseEnter = async () => {
    let length = heights.length;
    let heightsCopy = [...heights];

    // heightsCopy[0] = 200;
    // setHeights(heightsCopy);
    // await new Promise((k) => setTimeout(k, 2000));

    // heightsCopy[1] = 200;
    // setHeights(heightsCopy);
    // await new Promise((k) => setTimeout(k, 2000));

    // heightsCopy[2] = 200;
    // setHeights(heightsCopy);
    // await new Promise((k) => setTimeout(k, 2000));

    // heightsCopy[3] = 200;
    // setHeights(heightsCopy);
    // await new Promise((k) => setTimeout(k, 2000));

    // heightsCopy[4] = 200;
    // setHeights(heightsCopy);
    // await new Promise((k) => setTimeout(k, 2000));

    for (let i = 0; i < length - 1; i++) {
      let isSwapped: boolean = false;

      for (let j = 0; j < length - i - 1; j++) {
        if (heightsCopy[j] <= heightsCopy[j + 1]) continue;

        var tempHeight = heightsCopy[j];
        heightsCopy[j] = heightsCopy[j + 1];
        heightsCopy[j + 1] = tempHeight;

        setHeights(heightsCopy);
        console.log(`${heightsCopy}`);
        console.log(`waiting 5 seconds`);
        await test();
        console.log(`5 seconds passed`);

        isSwapped = true;
      }
      if (!isSwapped) break;
    }

    console.log(`END OF event`);
  };
  const handleModuleMouseLeave = () => {};

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}>
        <div
          css={css`
            margin: 0px 10px 0px 10px;
            height: 200px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          `}
        >
          {heights.map((height, index) => (
            <SortingBar key={index} height={height} />
          ))}
        </div>
      </ModulePlaceholder>
    </div>
  );
};
