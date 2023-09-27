import { StringMatchingAlgorithmBase } from '../Abstractions/AlgorithmBase';
import {
  updateStringMatchingAnimationInputState,
  updateStringMatchingAnimationPatternState,
} from '../../Store/String Matching Module/StringMatchingModuleStateManagement';
import { isAnimationTerminated, pauseForStepIteration } from '../Helper';
import { StringMatchingCharacterStateEnum } from '../../Resources/Enumerations';
import { store } from '../../Store/Store';

export class NaivePatternMatching extends StringMatchingAlgorithmBase {
  public async executeAlgorithm(): Promise<void> {
    let animationPatternCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationPattern];
    let animationInputCopy = [...store.getState().stringMatchingModuleState.stringMatchingAnimationInput];
    let patternLength: number = animationPatternCopy.length;
    let inputLength: number = animationInputCopy.length;

    for (let i = 0; i <= inputLength - patternLength; i++) {
      let j = 0;
      let isPreviouslyFound: boolean = false;
      for (j = 0; j < patternLength; ++j) {
        if (!isPreviouslyFound && animationInputCopy[i + j].characterState === StringMatchingCharacterStateEnum.Found) isPreviouslyFound = true;

        animationPatternCopy = [...animationPatternCopy];
        animationPatternCopy[j] = { ...animationPatternCopy[j], characterState: StringMatchingCharacterStateEnum.Current };
        store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
        animationInputCopy = [...animationInputCopy];
        animationInputCopy[i + j] = { ...animationInputCopy[i + j], characterState: StringMatchingCharacterStateEnum.Current };
        store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));

        await pauseForStepIteration();
        if (await isAnimationTerminated()) return;

        if (animationInputCopy[i + j].character.toLowerCase() !== animationPatternCopy[j].character.toLowerCase()) {
          j++;
          break;
        } else {
          animationPatternCopy = [...animationPatternCopy];
          animationPatternCopy[j] = { ...animationPatternCopy[j], characterState: StringMatchingCharacterStateEnum.Checked };
          store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
          animationInputCopy = [...animationInputCopy];
          animationInputCopy[i + j] = { ...animationInputCopy[i + j], characterState: StringMatchingCharacterStateEnum.Checked };
          store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
        }
      }

      animationPatternCopy = [...animationPatternCopy];
      animationInputCopy = [...animationInputCopy];

      let isPatternFound: boolean = --j === patternLength - 1;
      for (; j >= 0; j--) {
        animationPatternCopy[j] = { ...animationPatternCopy[j], characterState: StringMatchingCharacterStateEnum.Unselected };

        animationInputCopy[i + j] = {
          ...animationInputCopy[i + j],
          characterState: isPatternFound || isPreviouslyFound ? StringMatchingCharacterStateEnum.Found : StringMatchingCharacterStateEnum.Unselected,
        };
      }

      store.dispatch(updateStringMatchingAnimationPatternState(animationPatternCopy));
      store.dispatch(updateStringMatchingAnimationInputState(animationInputCopy));
    }
  }
}

export class KnuthMorrisPrattPatternMatching extends StringMatchingAlgorithmBase {
  public async executeAlgorithm(): Promise<void> {}
}
