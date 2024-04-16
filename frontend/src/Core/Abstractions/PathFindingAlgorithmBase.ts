import { IPathFindingCellProps } from '../Interfaces/IPathFindingCellProps';
import { AlgorithmBase } from './AlgorithmBase';

export abstract class PathFindingAlgorithmBase extends AlgorithmBase {
  public finalState: IPathFindingCellProps[][] = [];
}
