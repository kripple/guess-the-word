import { useEffect, useRef } from 'react';

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const height = ref.current.offsetHeight.valueOf();
    if (height === 0) return;

    document.documentElement.style.setProperty(
      '--target-height',
      `${height}px`,
    );
    ref.current?.classList.add('animated');
  }, [ref.current, ref.current?.offsetHeight]);

  if (!win) return null;
  return (
    <div className="word-data">
      {data ? (
        <div className="expandable" ref={ref}>
          <Text description={data?.phonetic} textClass="phonetic" />

          {data.meanings.map((meaning, mIndex) => (
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
      ) : null}
    </div>
  );
}
