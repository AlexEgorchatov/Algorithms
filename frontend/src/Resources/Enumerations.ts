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
  Checked = 1,
  Source = 2,
  Destination = 3,
  Wall = 4,
  Path = 5,
  None = 6,
}
