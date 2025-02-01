import { Text } from '@/components/Text';
import { useDictionaryApi } from '@/hooks/useDictionaryApi';

import '@/components/definition.css';

export function Definition({
  win,
  word,
  onError,
}: {
  win?: boolean;
  word: string;
  onError: () => void;
}) {
  const { data } = useDictionaryApi({
    word,
    onError,
  });

  if (!win) return null;
  return (
    <div className="word-data">
      <Text description={data?.phonetic} textClass="phonetic" />

      {data?.meanings.map((meaning, mIndex) => (
        <div className="definitions" key={mIndex}>
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
    </div>
  );
}
