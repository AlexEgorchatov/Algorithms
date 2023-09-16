import { store } from '../../App';
import { StringMatchingCharacterProps, selectedStringMatchingAlgorithm } from '../../Pages/StringMatchingPage';

export class StringMatchingAlgorithmManager {
  public static initialState: StringMatchingCharacterProps[] = [];

  private constructor() {}

  public static setInitialState(): void {
    this.initialState = store.getState().stringMatchingPageState.stringMatchingAnimationInput;
  }

  public static async startAlgorithm(): Promise<void> {
    selectedStringMatchingAlgorithm.executeAlgorithm();
  }

  public static async stopAlgorithm(): Promise<void> {}

  public static async completeAlgorithm(): Promise<void> {}
}
