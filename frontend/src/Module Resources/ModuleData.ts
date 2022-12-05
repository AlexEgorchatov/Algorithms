import { ModuleEnumeration } from './ModuleEnumeration';

export interface ModuleData {
  moduleType: ModuleEnumeration;
  title: string;
  startAnimation: (initialData: object) => void;
  stopAnimation: () => void;
}

export const modules: ModuleData[] = [
  {
    moduleType: ModuleEnumeration.Sorting,
    title: 'Sorting',
    startAnimation: function (initialData: object): void {},
    stopAnimation: function (): void {},
  },
  {
    moduleType: ModuleEnumeration.StringMatching,
    title: 'String Matching',
    startAnimation: function (initialData: object): void {},
    stopAnimation: function (): void {},
  },
  {
    moduleType: ModuleEnumeration.PathFinding,
    title: 'Path Finding',
    startAnimation: function (initialData: object): void {},
    stopAnimation: function (): void {},
  },
];
