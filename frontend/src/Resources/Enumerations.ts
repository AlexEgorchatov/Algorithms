export enum ModuleEnum {
  Sorting = 0,
  StringMatching = 1,
  PathFinding = 2,
}

export enum SortingBarStateEnum {
  Unselected = 0,
  Selected = 1,
  Pivot = 2,
  Completed = 999,
}

export enum StringMatchingCharacterStateEnum {
  Unselected = 0,
  Checked = 1,
  Current = 2,
  Found = 3,
}

export enum PathFindingCellStateEnum {
  Unselected = 0,
  Source = 1,
  Destination = 2,
  Wall = 3,
  Checked = 4,
  Path = 5,
}

export enum PathFindingCellActionStateEnum {
  Unselected = 0,
  Source = 1,
  Destination = 2,
  Wall = 3,
  None = 4,
}

export enum PathFindingCellDraggingStateEnum {
  Source = 1,
  Destination = 2,
  Wall = 3,
  None = 4,
}
