import random from 'just-random';
import { useCallback, useEffect, useState } from 'react';

import { GameControls } from '@/components/GameControls';
import { Theme } from '@/components/Theme';
import { WordCard } from '@/components/WordCard';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import type { ClickEvent } from '@/types/event';
import { isLetter } from '@/types/letter';
import type { Letter } from '@/types/letter';

import '@/components/app.css';

export function App() {
  const { data: words } = useGoogleSheets();
  const [word, setWord] = useState<string>();
  const [guesses, setGuesses] = useState<Set<Letter>>(new Set());
  const letters: Set<Letter> = new Set(
    (function () {
      if (!word) return [];
      return word.split('').reduce((result, letter) => {
        if (!isLetter(letter)) {
          console.warn('unexpected character');
          return result;
        }
        result.push(letter);
        return result;
      }, [] as Letter[]);
    })(),
  );
  const incorrectGuesses = guesses.difference<Letter>(letters).size;
  const maxTries = 7 as const;
  const remainingTries = maxTries - incorrectGuesses;
  const win =
    letters.size > 0 && letters.isSubsetOf(guesses)
      ? true
      : remainingTries > 0
        ? undefined
        : false;

  const newGame = useCallback(() => {
    setGuesses(new Set());
    words && setWord(random(words));
  }, [words]);

  useEffect(() => {
    if (!words) return;
    setWord(random(words));
  }, [words]);

  const onClick = useCallback((event: ClickEvent) => {
    const value = event.currentTarget.value;

    if (!isLetter(value)) {
      console.warn('unexpected input');
      return;
    }
    setGuesses((current) => {
      const draft = new Set(current);
      draft.add(value);
      return draft;
    });
  }, []);

  return (
    <Theme>
      <h1 className="app-title">Mysticabulary</h1>
      <h2 className="app-subtitle">
        {win ? 'You Win!' : `You have ${remainingTries} guesses remaining.`}
      </h2>
      <div className="app-container">
        <WordCard guesses={guesses} onError={newGame} win={win} word={word} />
        <GameControls
          disabled={!word || win !== undefined}
          guesses={guesses}
          letters={letters}
          newGame={newGame}
          onClick={onClick}
        />
      </div>
    </Theme>
  );
}
