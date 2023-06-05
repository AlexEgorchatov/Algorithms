export enum ModuleEnumeration {
  Sorting = 0,
  StringMatching = 1,
  PathFinding = 2,
}

export interface ModuleData {
  moduleType: ModuleEnumeration;
  title: string;
  link: string;
}

export const modules: ModuleData[] = [
  {
    moduleType: ModuleEnumeration.Sorting,
    title: 'Sorting',
    link: 'sort',
  },
  {
    moduleType: ModuleEnumeration.StringMatching,
    title: 'String Matching',
    link: 'search',
  },
  {
    moduleType: ModuleEnumeration.PathFinding,
    title: 'Path Finding',
    link: 'pathfinding',
  },
];
