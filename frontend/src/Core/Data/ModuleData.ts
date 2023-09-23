import { ModuleEnum } from '../../Resources/Enumerations';

export interface ModulePreviewData {
  moduleType: ModuleEnum;
  title: string;
  link: string;
}

export const modules: ModulePreviewData[] = [
  {
    moduleType: ModuleEnum.Sorting,
    title: 'Sorting',
    link: 'sort',
  },
  {
    moduleType: ModuleEnum.StringMatching,
    title: 'String Matching',
    link: 'search',
  },
  {
    moduleType: ModuleEnum.PathFinding,
    title: 'Path Finding',
    link: 'pathfinding',
  },
];
