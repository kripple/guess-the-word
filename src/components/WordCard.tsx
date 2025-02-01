import { Definition } from '@/components/Definition';
import type { Letter } from '@/types/letter';

import '@/components/word-card.css';

export function WordCard({
  guesses,
  win,
  word,
  onError,
}: {
  guesses: Set<Letter>;
  win?: boolean;
  word?: string;
  onError: () => void;
}) {
  return (
    <section className="word-card">
      <h3 className="secret-word">
        {(word || ' ').split('').map((letter, index) =>
          (guesses as Set<string>).has(letter) ? (
            <span className="letter" key={index}>
              {letter}
            </span>
          ) : (
            <span className="unknown-letter" key={index} />
          ),
        )}
      </h3>
      {word ? <Definition onError={onError} win={win} word={word} /> : null}
    </section>
  );
}
