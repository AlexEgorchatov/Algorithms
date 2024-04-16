import { store } from '../../Redux/Store';
import { StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { IStringMatchingCharacterProps } from '../Interfaces/IStringMatchingCharacterProps';
import { AlgorithmBase } from './AlgorithmBase';

export abstract class StringMatchingAlgorithmBase extends AlgorithmBase {
  public finalState: IStringMatchingCharacterProps[] = [];
  public finalPatternState: IStringMatchingCharacterProps[] = [];

  public setFinalState(): void {
    let stringMatchingModuleState = store.getState().stringMatchingModuleState;
    let input = stringMatchingModuleState.stringMatchingInput.toLowerCase();
    let pattern = stringMatchingModuleState.stringMatchingPattern.toLowerCase();
    let animationInputCopy = [...stringMatchingModuleState.stringMatchingAnimationInput];

    let foundIndex: number = pattern.length === 0 ? -1 : input.indexOf(pattern);
    while (foundIndex !== -1) {
      for (let i = foundIndex; i < foundIndex + pattern.length; i++) {
        if (animationInputCopy[i].characterState === StringMatchingCharacterStateEnum.Found)
          continue;

        animationInputCopy[i] = {
          ...animationInputCopy[i],
          characterState: StringMatchingCharacterStateEnum.Found,
        };
      }
      foundIndex = input.indexOf(pattern, foundIndex + 1);
    }

    this.finalPatternState = stringMatchingModuleState.stringMatchingAnimationPattern;
    this.finalState = [...animationInputCopy];
  }

  public selectCharacters(
    animationPatternCopy: IStringMatchingCharacterProps[],
    animationInputCopy: IStringMatchingCharacterProps[],
    patternIndex: number,
    inputIndex: number,
    highlightCharacterState: StringMatchingCharacterStateEnum,
  ): void {
    animationPatternCopy[patternIndex] = {
      ...animationPatternCopy[patternIndex],
      characterState: highlightCharacterState,
    };
    animationInputCopy[inputIndex] = {
      ...animationInputCopy[inputIndex],
      characterState: highlightCharacterState,
    };
  }
}
