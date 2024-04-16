import { IStringMatchingCharacterProps } from '../Interfaces/IStringMatchingCharacterProps';

export const processStringMatchingInput = (input: string): IStringMatchingCharacterProps[] => {
  let stringArrayInput = input.split('');
  let stringMatchingCharacters: IStringMatchingCharacterProps[] = [];

  for (let i = 0; i < stringArrayInput.length; i++) {
    stringMatchingCharacters.push({ character: stringArrayInput[i] });
  }

  return stringMatchingCharacters;
};
