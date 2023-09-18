import { SortingBarStateEnum, StringMatchingCharacterStateEnum } from './Enumerations';

export interface SortingBarProps {
  barHeight: number;
  barID?: number;
  barState?: SortingBarStateEnum;
  leftOffset?: number;
}
export interface StringMatchingCharacterProps {
  character: string;
  characterState?: StringMatchingCharacterStateEnum;
}

export interface ModuleTitle {
  title: string;
}
