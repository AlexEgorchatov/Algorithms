import { SortingBarStateEnum } from '../../Resources/Enumerations';

export interface ISortingBarProps {
  barHeight: number;
  barID?: number;
  barState?: SortingBarStateEnum;
  leftOffset?: number;
}
