/* eslint-disable react-hooks/exhaustive-deps */
/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { StringMatchingCharacterStateEnum } from '../Resources/Enumerations';
import { IStringMatchingCharacterProps } from '../Core/Interfaces/IStringMatchingCharacterProps';
import { SearchableCharacter } from '../Components/Module Previews/StringMatchingPreviewCharacter';

export const NotFoundPage = () => {
  const [notFoundUrl, setNotFoundUrl] = useState<IStringMatchingCharacterProps[]>([]);
  const [isSearchCompleted, setIsSearchCompleted] = useState<boolean>(false);
  let url = window.location.pathname.substring(
    window.location.pathname.substring(1).indexOf('/') + 2,
  );

  const animateUrl = async () => {
    let urlArray: IStringMatchingCharacterProps[] = new Array(Math.min(url.length, 10));
    for (let i = 0; i < urlArray.length; i++) {
      urlArray[i] = { character: url[i] };
    }
    setNotFoundUrl(urlArray);
    await new Promise((resolve) => setTimeout(resolve, 500));

    urlArray = [...urlArray];

    for (let i = 0; i < urlArray.length; i++) {
      urlArray[i] = {
        ...urlArray[i],
        characterState: StringMatchingCharacterStateEnum.Current,
      };
      setNotFoundUrl(urlArray);
      urlArray = [...urlArray];
      await new Promise((resolve) => setTimeout(resolve, 50));

      urlArray[i] = {
        ...urlArray[i],
        characterState: StringMatchingCharacterStateEnum.Unselected,
      };
      setNotFoundUrl(urlArray);
      urlArray = [...urlArray];
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    setIsSearchCompleted(true);
  };

  useEffect(() => {
    animateUrl();
  }, []);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          position: relative;
          top: -100px;
          font-size: 24px;
          color: #ffffff;
        `}
      >
        <div
          css={css`
            display: flex;
            font-size: 36px;
            justify-content: center;
          `}
        >
          {notFoundUrl.map((character, index) => (
            <SearchableCharacter
              key={index}
              character={character.character}
              characterState={character.characterState}
            />
          ))}
          {url.length > 10 ? '...' : ''}
        </div>
        <div
          css={css`
            visibility: ${isSearchCompleted ? 'visible' : 'hidden'};
            text-align: center;
          `}
        >
          Sorry, the requested page is not found
        </div>
      </div>
    </div>
  );
};
