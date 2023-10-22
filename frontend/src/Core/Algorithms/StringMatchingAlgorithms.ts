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
      for (j = 0; j < patternLength; j++) {
        this.selectCharacters(animationPatternCopy, animationInputCopy, j, i + j, StringMatchingCharacterStateEnum.Current);
        store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
        store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
        animationPatternCopy = [...animationPatternCopy];
        animationInputCopy = [...animationInputCopy];

        await pauseForStepIteration();
        if (await isAnimationTerminated()) return i;
        if (animationInputCopy[i + j].character.toLowerCase() !== animationPatternCopy[j].character.toLowerCase()) break;

        this.selectCharacters(animationPatternCopy, animationInputCopy, j, i + j, StringMatchingCharacterStateEnum.Checked);
      }

      j = j === patternLength ? j - 1 : j;
      for (; j >= 0; j--) {
        animationPatternCopy[j] = { ...animationPatternCopy[j], characterState: StringMatchingCharacterStateEnum.Unselected };
        animationInputCopy[i + j] = {
          ...animationInputCopy[i + j],
          characterState:
            this.finalState[i].characterState === StringMatchingCharacterStateEnum.Found &&
            this.finalState[i + j].characterState === StringMatchingCharacterStateEnum.Found
              ? StringMatchingCharacterStateEnum.Found
              : StringMatchingCharacterStateEnum.Unselected,
        };
      }
    }

    store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
    store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
    return -1;
  }
}

export class KnuthMorrisPrattPatternMatching extends StringMatchingAlgorithmBase {
  public async executeAlgorithm(): Promise<number> {
    let animationPatternCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationPattern];
    let animationInputCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationInput];
    let patternLength = animationPatternCopy.length;
    let inputLength = animationInputCopy.length;
    let lps: number[] = this.computeLPSArray(animationPatternCopy);
    let inputIndex: number = 0;
    let patternIndex: number = 0;

    while (inputLength - inputIndex >= patternLength - patternIndex) {
      this.selectCharacters(animationPatternCopy, animationInputCopy, patternIndex, inputIndex, StringMatchingCharacterStateEnum.Current);
      store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
      store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
      animationPatternCopy = [...animationPatternCopy];
      animationInputCopy = [...animationInputCopy];

      await pauseForStepIteration();
      if (await isAnimationTerminated()) return inputIndex - patternIndex;

      if (animationPatternCopy[patternIndex].character.toLowerCase() === animationInputCopy[inputIndex].character.toLowerCase()) {
        if (patternIndex + 1 !== patternLength)
          this.selectCharacters(animationPatternCopy, animationInputCopy, patternIndex, inputIndex, StringMatchingCharacterStateEnum.Checked);
        patternIndex++;
        inputIndex++;
      }
      if (patternIndex === patternLength) {
        patternIndex--;
        for (let i = patternIndex; i >= 0; i--) {
          animationPatternCopy[i] =
            i > lps[patternIndex] ? { ...animationPatternCopy[i], characterState: StringMatchingCharacterStateEnum.Unselected } : { ...animationPatternCopy[i] };
          animationInputCopy[inputIndex - i - 1] = {
            ...animationInputCopy[inputIndex - i - 1],
            characterState: i >= lps[patternIndex] ? this.finalState[inputIndex - i - 1].characterState : StringMatchingCharacterStateEnum.Checked,
          };
        }

        patternIndex = lps[patternLength - 1];
      } else if (inputIndex < inputLength && animationPatternCopy[patternIndex].character.toLowerCase() !== animationInputCopy[inputIndex].character.toLowerCase()) {
        if (patternIndex !== 0) {
          if (animationPatternCopy[patternIndex].characterState !== StringMatchingCharacterStateEnum.Current) {
            this.selectCharacters(animationPatternCopy, animationInputCopy, patternIndex, inputIndex, StringMatchingCharacterStateEnum.Current);
            store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
            store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
            animationPatternCopy = [...animationPatternCopy];
            animationInputCopy = [...animationInputCopy];

            await pauseForStepIteration();
            if (await isAnimationTerminated()) return inputIndex - patternIndex;
          }
          for (let i = patternIndex; i > lps[patternIndex - 1]; i--) {
            animationPatternCopy[i] = { ...animationPatternCopy[i], characterState: StringMatchingCharacterStateEnum.Unselected };
            animationInputCopy[inputIndex - i] = { ...animationInputCopy[inputIndex - i], characterState: this.finalState[inputIndex - i].characterState };
          }

          patternIndex = lps[patternIndex - 1];
        } else {
          animationInputCopy[inputIndex] = { ...animationInputCopy[inputIndex], characterState: StringMatchingCharacterStateEnum.Unselected };
          inputIndex++;
        }
      }
    }

    inputIndex = inputIndex >= animationInputCopy.length ? inputIndex - 1 : inputIndex;
    for (let i = patternLength - 1; i >= 0; i--) {
      animationPatternCopy[i] = { ...animationPatternCopy[i], characterState: StringMatchingCharacterStateEnum.Unselected };
      if (inputIndex - i < 0) continue;

      animationInputCopy[inputIndex - i] = { ...animationInputCopy[inputIndex - i], characterState: this.finalState[inputIndex - i].characterState };
    }

    store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
    store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
    return -1;
  }

  private computeLPSArray(pattern: IStringMatchingCharacterProps[]): number[] {
    let prefixSuffixLength: number = 0;
    let lpsIndex: number = 1;
    let lps: number[] = new Array(pattern.length).fill(0);

    while (lpsIndex < pattern.length) {
      if (pattern[lpsIndex].character === pattern[prefixSuffixLength].character) {
        lps[lpsIndex++] = ++prefixSuffixLength;
        continue;
      }

      if (prefixSuffixLength === 0) lpsIndex++;
      else prefixSuffixLength = lps[prefixSuffixLength - 1];
    }

    return lps;
  }
}
