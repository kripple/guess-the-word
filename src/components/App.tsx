import random from 'just-random';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import { useEffect, useState } from 'react';

import { Definition } from '@/components/Definition';
import { Theme } from '@/components/Theme';

import '@/components/app.css';

export function App() {
  const spreadsheetId = '1S9OrkKnaKlFM1HzYLoPH__8YoLVhxnoMaa5tAUzUSeM' as const;
  const [words, setWords] = useState<string[]>();
  const [word, setWord] = useState<string>();

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(spreadsheetId);
    parser.parse().then((data) => {
      if (!data || !Array.isArray(data)) {
        console.warn('unexpected response');
        return;
      }
      setWords(
        data.map((item: unknown) => {
          if (!item || typeof item !== 'object') {
            console.warn('unexpected item');
            return;
          }
          const values = Object.values(item);
          if (values.length !== 1) {
            console.warn('unexpected item contents');
            return;
          }
          return values[0];
        }),
      );
    });
  }, []);

  useEffect(() => {
    if (!words) return;
    setWord(random(words));
  }, [words]);

  return (
    <Theme>
      <h1 className="app-title">Mysticabulary</h1>
      {word ? <Definition word={word} /> : null}
    </Theme>
  );
}
