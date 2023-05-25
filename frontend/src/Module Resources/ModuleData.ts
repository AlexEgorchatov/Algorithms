import { ModuleEnumeration } from './ModuleEnumeration';

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
    link: 'path_find',
  },
];
