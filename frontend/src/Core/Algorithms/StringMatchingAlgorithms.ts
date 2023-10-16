import { StringMatchingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import {
  updateStringMatchingAnimationInputState,
  updateStringMatchingAnimationPatternState,
} from '../../Store/String Matching Module/StringMatchingModuleStateManagement';
import { isAnimationTerminated, pauseForStepIteration } from '../Helper';
import { StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { store } from '../../Store/Store';
import { IStringMatchingCharacterProps } from '../Interfaces/IStringMatchingCharacterProps';

export class NaivePatternMatching extends StringMatchingAlgorithmBase {
  public async executeAlgorithm(): Promise<number> {
    let animationPatternCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationPattern];
    let animationInputCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationInput];
    let patternLength: number = animationPatternCopy.length;
    let inputLength: number = animationInputCopy.length;

    for (let i = 0; i <= inputLength - patternLength; i++) {
      let j = 0;
      for (j = 0; j < patternLength; ++j) {
        await this.highlightCharacters(animationPatternCopy, animationInputCopy, j, i + j, StringMatchingCharacterStateEnum.Current);
        animationPatternCopy = [...animationPatternCopy];
        animationInputCopy = [...animationInputCopy];

        await pauseForStepIteration();
        if (await isAnimationTerminated()) return i;
        if (animationInputCopy[i + j].character.toLowerCase() !== animationPatternCopy[j].character.toLowerCase()) break;

        this.highlightCharacters(animationPatternCopy, animationInputCopy, j, i + j, StringMatchingCharacterStateEnum.Checked);
        animationPatternCopy = [...animationPatternCopy];
        animationInputCopy = [...animationInputCopy];
      }

      let isPatternFound: boolean = j === patternLength;
      j = isPatternFound ? j - 1 : j;
      for (; j >= 0; j--) {
        animationPatternCopy[j] = { ...animationPatternCopy[j], characterState: StringMatchingCharacterStateEnum.Unselected };
        animationInputCopy[i + j] = { ...animationInputCopy[i + j], characterState: this.finalState[i + j].characterState };
      }

      store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
      store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
      animationPatternCopy = [...animationPatternCopy];
      animationInputCopy = [...animationInputCopy];
    }

    return -1;
  }
}

export class KnuthMorrisPrattPatternMatching extends StringMatchingAlgorithmBase {
  public async executeAlgorithm(): Promise<number> {
    let animationPatternCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationPattern];
    let animationInputCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationInput];
    let patternLength = animationPatternCopy.length;
    let inputLength = animationInputCopy.length;
    let lps: number[] = new Array(patternLength).fill(0);

    this.computeLPSArray(animationPatternCopy, lps);

    let inputIndex: number = 0;
    let patternIndex: number = 0;

    while (inputLength - inputIndex >= patternLength - patternIndex) {
      animationPatternCopy[patternIndex] = { ...animationPatternCopy[patternIndex], characterState: StringMatchingCharacterStateEnum.Current };
      store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
      animationPatternCopy = [...animationPatternCopy];
      animationInputCopy[inputIndex] = { ...animationInputCopy[inputIndex], characterState: StringMatchingCharacterStateEnum.Current };
      store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
      animationInputCopy = [...animationInputCopy];

      await pauseForStepIteration();

      if (animationPatternCopy[patternIndex].character.toLowerCase() === animationInputCopy[inputIndex].character.toLowerCase()) {
        animationPatternCopy[patternIndex] = { ...animationPatternCopy[patternIndex], characterState: StringMatchingCharacterStateEnum.Checked };
        store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
        animationPatternCopy = [...animationPatternCopy];
        animationInputCopy[inputIndex] = { ...animationInputCopy[inputIndex], characterState: StringMatchingCharacterStateEnum.Checked };
        store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
        animationInputCopy = [...animationInputCopy];

        patternIndex++;
        inputIndex++;
      }
      if (patternIndex === patternLength) {
        patternIndex = lps[patternIndex - 1];
      } else if (inputIndex < inputLength && animationPatternCopy[patternIndex].character.toLowerCase() !== animationInputCopy[inputIndex].character.toLowerCase()) {
        if (patternIndex !== 0) patternIndex = lps[patternIndex - 1];
        else inputIndex++;
      }
    }

    return -1;
  }

  private async computeLPSArray(pattern: IStringMatchingCharacterProps[], lps: number[]): Promise<void> {
    let length: number = 0;
    let i: number = 1;

    while (i < pattern.length) {
      if (pattern[i].character === pattern[length].character) {
        lps[i++] = ++length;
        continue;
      }

      if (length === 0) lps[i++] = length;
      else length = lps[length - 1];
    }
  }
}
