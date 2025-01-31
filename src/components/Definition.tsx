import { useEffect, useState } from 'react';

import { Text } from '@/components/Text';

type WordData = {
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

export function Definition({ word }: { word: string }) {
  const [data, setData] = useState<WordData>();
  const baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' as const;

  useEffect(() => {
    if (data) return;
    fetch(`${baseUrl}${word}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.length > 0 && setData(json[0]);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [data, word]);

  return (
    <section>
      <h2>{word}</h2>
      <Text description={data?.phonetic} />

      {data ? (
        <>
          {data.meanings.map((meaning, mIndex) => (
            <div key={mIndex}>
              {meaning.partOfSpeech ? (
                <p>
                  <i>{meaning.partOfSpeech}</i>
                </p>
              ) : null}
              <ul>
                {meaning.definitions.map((definition, dIndex) => (
                  <li key={dIndex}>
                    <Text description={definition.definition} />
                    <Text description={definition.example} label="Example" />
                    {/* <Text
                        description={definition.synonyms.join(', ')}
                        label="Synonyms"
                      /> */}
                    {/* <Text
                        description={definition.antonyms.join(', ')}
                        label="Antonyms"
                      /> */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ) : null}
    </section>
  );
}
