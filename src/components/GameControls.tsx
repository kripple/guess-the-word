import { Icon } from '@/components/Icon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
import type { OnClick } from '@/types/event';
import type { Letter } from '@/types/letter';

import '@/components/game-controls.css';

export function GameControls({
  disabled,
  guesses,
  letters,
  newGame,
  onClick,
}: {
  disabled?: boolean;
  guesses: Set<Letter>;
  letters: Set<Letter>;
  newGame: () => void;
  onClick: OnClick;
}) {
  const onKeyDown = useOnKeyDown();
  const keySpacer = 'key-spacer' as const;
  const halfKeySpacer = 'half-key-spacer' as const;
  const replay = 'replay' as const;
  const keyboard = [
    'qwertyuiop'.split(''),
    [halfKeySpacer, ...'asdfghjkl'.split(''), halfKeySpacer],
    [keySpacer, ...'zxcvbnm'.split(''), replay, keySpacer],
  ] as const;

  return (
    <div aria-label="Keyboard" className="keyboard" role="group">
      {keyboard.map((row, rowNumber) => (
        <div className="keyboard-row" key={rowNumber}>
          {row.map((letter, index) => {
            if (letter === keySpacer) {
              return (
                <div
                  className="key-spacer"
                  key={`spacer-${index}`}
                  tabIndex={-1}
                ></div>
              );
            }
            if (letter === halfKeySpacer) {
              return (
                <div
                  className="half-key-spacer"
                  key={`spacer-${index}`}
                  tabIndex={-1}
                ></div>
              );
            }
            if (letter === replay) {
              return (
                <button
                  aria-disabled={!disabled}
                  aria-label={letter}
                  className="keyboard-key"
                  disabled={!disabled}
                  key={letter}
                  onClick={newGame}
                  onKeyDown={onKeyDown}
                  tabIndex={0}
                  title={!disabled ? undefined : 'New Game'}
                  type="button"
                  value={letter}
                >
                  <Icon icon="replay" id="new-game-button" />
                </button>
              );
            }

            const guessed = (guesses as Set<string>).has(letter);
            const correct = guessed && (letters as Set<string>).has(letter);
            const keyDisabled = disabled || guessed;
            return (
              <button
                aria-disabled={keyDisabled}
                aria-label={letter}
                className={`keyboard-key${correct ? ' correct' : ''}`}
                disabled={keyDisabled}
                key={letter}
                onClick={onClick}
                onKeyDown={onKeyDown}
                tabIndex={0}
                type="button"
                value={letter}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
