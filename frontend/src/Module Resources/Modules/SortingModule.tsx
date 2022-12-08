/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IModule } from '../IModule';
import { ModulePlaceholder } from '../ModulePlaceHolder';

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

export const SortingModule = ({ title }: IModule) => {
  let bars: number[] = [180, 100, 120, 140, 160];
  const handleModuleMouseEnter = () => {
    console.log('Entered Sorting module');
  };
  const handleModuleMouseLeave = () => {
    console.log('Left Sorting module');
  };

  return (
    <div onMouseEnter={handleModuleMouseEnter} onMouseLeave={handleModuleMouseLeave}>
      <ModulePlaceholder title={title}>
        <div
          css={css`
            height: 200px;
            margin: 0px 10px 0px 10px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          `}
        >
          {bars.map((bar, index) => (
            <SortingBar key={index} height={bar} />
          ))}
        </div>
      </ModulePlaceholder>
    </div>
  );
};
