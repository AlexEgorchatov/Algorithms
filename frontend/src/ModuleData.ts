import { ModuleEnumeration } from './ModuleEnumeration';

export interface ModuleData {
  moduleId: number;
  moduleType: ModuleEnumeration;
  title: string;
}

export const modules: ModuleData[] = [
  {
    moduleId: 0,
    moduleType: ModuleEnumeration.Sorting,
    title: 'Sorting',
  },
  {
    moduleId: 1,
    moduleType: ModuleEnumeration.StringMatching,
    title: 'String Matching',
  },
  {
    moduleId: 2,
    moduleType: ModuleEnumeration.PathFinding,
    title: 'Path Finding',
  },
];
