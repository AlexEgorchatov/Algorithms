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

      let isPatternFound: boolean = j === patternLength;
      j = isPatternFound ? j - 1 : j;
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
    let lps: number[] = new Array(patternLength).fill(0);

    this.computeLPSArray(animationPatternCopy, lps);

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
        this.selectCharacters(animationPatternCopy, animationInputCopy, patternIndex, inputIndex, StringMatchingCharacterStateEnum.Checked);
        patternIndex++;
        inputIndex++;
      }
      if (patternIndex === patternLength) {
        patternIndex--;
        for (let i = patternIndex; i >= 0; i--) {
          if (i > lps[patternIndex]) {
            animationPatternCopy[i] = { ...animationPatternCopy[i], characterState: StringMatchingCharacterStateEnum.Unselected };
          }

          animationInputCopy[inputIndex - i - 1] = {
            ...animationInputCopy[inputIndex - i - 1],
            characterState: this.finalState[inputIndex - i - 1].characterState,
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
          for (let i = patternIndex; i >= 0; i--) {
            if (i > lps[patternIndex - 1]) {
              animationPatternCopy[i] = { ...animationPatternCopy[i], characterState: StringMatchingCharacterStateEnum.Unselected };
              animationInputCopy[inputIndex - i] = { ...animationInputCopy[inputIndex - i], characterState: this.finalState[inputIndex - i].characterState };
            } else {
              this.selectCharacters(animationPatternCopy, animationInputCopy, i, inputIndex - i, StringMatchingCharacterStateEnum.Checked);
            }
          }

          patternIndex = lps[patternIndex - 1];
        } else {
          animationInputCopy[inputIndex] = { ...animationInputCopy[inputIndex], characterState: StringMatchingCharacterStateEnum.Unselected };
          inputIndex++;
        }
      }
    }

    for (let i = patternLength - 1; i >= 0; i--) {
      animationPatternCopy[i] = { ...animationPatternCopy[i], characterState: StringMatchingCharacterStateEnum.Unselected };
      if (inputIndex - i < animationInputCopy.length)
        animationInputCopy[inputIndex - i] = { ...animationInputCopy[inputIndex - i], characterState: this.finalState[inputIndex - i].characterState };
    }

    store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
    store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
    return -1;
  }

  private computeLPSArray(pattern: IStringMatchingCharacterProps[], lps: number[]): void {
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

    console.log(lps);
  }
}

/*
THIS IS A TEST TEXT
TEST

AABAACAADAABAABA
AABA

AAAAAAAAAAAAAAAAAB
AAAAB

ABABABCABABABCABABABC
ABABAC

AAAAABAAABA
AAAA

aaaabaaaaab
aaaab

aaaaaabaaaaab
aaaab
*/
