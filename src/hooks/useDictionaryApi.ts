import { useEffect, useState } from 'react';

export type DictionaryData = {
  word: string;
  phonetic: string;
  phonetics: {
    text: string;
    audio?: string;
  }[];
  origin: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
};

export const useDictionaryApi = ({
  word,
  onError,
}: {
  word: string;
  onError: () => void;
}) => {
  const [data, setData] = useState<DictionaryData>();

  useEffect(() => {
    const baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' as const;
    fetch(`${baseUrl}${word}`)
      .then((response) => {
        if (response.status === 404) {
          return onError();
        }
        if (response.status !== 200) {
          console.debug(`unexpected response code '${response.status}'`);
          return;
        }
        return response.json();
      })
      .then((json) => {
        json && json.length > 0 && setData(json[0]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [word]);

  return { data };
};
