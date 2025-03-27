import { Text } from '@/components/Text';
import { useDictionaryApi } from '@/hooks/useDictionaryApi';

import '@/components/definition.css';

export function Definition({
  showDefinition,
  word,
  onError,
}: {
  showDefinition?: boolean;
  word: string;
  onError?: () => void;
}) {
  const { data } = useDictionaryApi({
    word,
    onError,
  });

  return (
    <div className="definition">
      {data?.shortdef && showDefinition ? (
        <ul>
          {data.shortdef.map((def, i) => (
            <li key={i}>
              <Text description={def} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
