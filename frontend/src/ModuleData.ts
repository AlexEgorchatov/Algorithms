import { ModuleEnumeration } from './ModuleEnumeration';

export interface ModuleData {
  moduleType: ModuleEnumeration;
  title: string;
}

export const modules: ModuleData[] = [
  {
    moduleType: ModuleEnumeration.Sorting,
    title: 'Sorting',
  },
  {
    moduleType: ModuleEnumeration.StringMatching,
    title: 'String Matching',
  },
  {
    moduleType: ModuleEnumeration.PathFinding,
    title: 'Path Finding',
  },
  {
    moduleType: ModuleEnumeration.PathFinding,
    title: 'Path Finding',
  },
];
