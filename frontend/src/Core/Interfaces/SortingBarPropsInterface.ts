import { SortingBarStateEnum } from '../../Resources/Enumerations';

export interface SortingBarProps {
  barHeight: number;
  barID?: number;
  barState?: SortingBarStateEnum;
  leftOffset?: number;
}
