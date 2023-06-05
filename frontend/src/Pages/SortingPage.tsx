/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import { mainFontColor, moduleBackground } from '../Resources/Colors';
import { SliderComponent } from '../Components/Slider';
import { SortingEnumeration, modules } from '../Resources/Sorting Page Resources/SortingData';

export const SortingPage = () => {
  // useEffect(() => {
  //   AlgorithmsContainer.current = React.createElement(
  //     'div',
  //     { css: `display: flex; width: 200px; height: 100px` },
  //     GetAlgorithms(),
  //   );
  //   console.log(AlgorithmsContainer.current);
  // }, []);

  // const GetAlgorithms = (): React.ReactNode[] => {
  //   let nodes: React.ReactNode[] = [];
  //   for (let i = 0; i < modules.length; i++) {
  //     let algorithm = React.createElement('Button', {
  //       textContent: modules[i].title,
  //       onClick: () => handleAlgorithmSelection(modules[i].sortingType),
  //       css: `background-color: transparent;`,
  //       key: i,
  //     });
  //     nodes.push(algorithm);
  //   }
  //   return nodes;
  // };

  // let AlgorithmsContainer = React.useRef<React.ReactNode>(null);

  // let [selectedAlgorithm, setSelectedAlgorithm] = React.useState<SortingEnumeration>(0);

  // const handleAlgorithmSelection = (algorithm: number) => {
  //   setSelectedAlgorithm(algorithm);
  // };

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
              Ex: "12 32 89 29". Maximum number of elements is 25. Difference between minimum and maximum values should be less
              than 200
            </div>
          </div>
        </div>
        <div
          css={css`
            font-size: 16px;
          `}
        >
          {/* Controls will be here{selectedAlgorithm} */}
        </div>
        {/* <div>{AlgorithmsContainer.current}</div> */}
      </div>
      <div
        css={css`
          background-color: ${moduleBackground};
        `}
      >
        <div></div>
        <SliderComponent />
      </div>
    </div>
  );
};
