/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { ICellActionState } from '../../../Core/Interfaces/ICellActionState';
import { AppState } from '../../../Redux/Store';
import {
  PathFindingCellActionStateEnum,
  PathFindingCellStateEnum,
} from '../../../Resources/Enumerations';
import { updatePathFindingSelectedCellActionState } from '../../../Redux/Path Finding Module/PathFindingModuleStateManagement';
import { isTouchDevice } from '../../../Core/Helpers/GeneralHelper';
import { headerItemHovered } from '../../../Resources/Colors';
import { getCellColor } from '../../../Core/Other/PathFindingAlgorithmsManager';

export const CellActionItem = ({ cellActionState }: ICellActionState) => {
  const animationState = useSelector((state: AppState) => state.animationState);
  const pathFindingState = useSelector((state: AppState) => state.pathFindingModuleState);
  const dispatch = useDispatch();

  const isCellActionItemEnabled = (): boolean => {
    if (animationState.hasAnimationStarted) return false;
    if (
      cellActionState !== PathFindingCellActionStateEnum.Source &&
      cellActionState !== PathFindingCellActionStateEnum.Destination
    )
      return true;
    if (
      cellActionState === PathFindingCellActionStateEnum.Source &&
      pathFindingState.pathFindingSource.cellState === PathFindingCellStateEnum.Unselected
    )
      return true;
    if (
      cellActionState === PathFindingCellActionStateEnum.Destination &&
      pathFindingState.pathFindingDestination.cellState === PathFindingCellStateEnum.Unselected
    )
      return true;

    return false;
  };
  const handleClick = () => {
    if (!isCellActionItemEnabled()) return;

    if (pathFindingState.pathFindingSelectedCellAction === cellActionState)
      dispatch(updatePathFindingSelectedCellActionState(PathFindingCellActionStateEnum.None));
    else dispatch(updatePathFindingSelectedCellActionState(cellActionState));
  };

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        width: 22px;
        height: 22px;
        background-color: ${pathFindingState.pathFindingSelectedCellAction === cellActionState
          ? '#71a1f5'
          : 'transparent'};
        opacity: ${isCellActionItemEnabled() ? '1' : '0.5'};
        ${!isTouchDevice &&
        `
            cursor: ${isCellActionItemEnabled() ? 'pointer' : 'default'};
            :hover {
              ${
                isCellActionItemEnabled() &&
                `
                  background-color: ${
                    pathFindingState.pathFindingSelectedCellAction === cellActionState
                      ? '#71a1f5'
                      : headerItemHovered
                  };
                `
              }
            }
          `}
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
