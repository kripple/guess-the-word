import { useEffect, useState } from 'react';

type DictionaryEntry = {
  meta: {
    id: string;
    uuid: string;
    sort: string;
    src: string;
    section: string;
    stems: string[];
    offensive: boolean;
  };
  hwi: {
    hw: string;
    prs: {
      mw: string;
      sound?: {
        audio: string;
        ref: string;
        stat: string;
      };
    }[];
  };
  fl: string;
  def: {
    sseq: [
      [
        [
          'sense',
          {
            sn: string;
            dt: [string, { t: string }[]][];
            sdsense?: {
              sd: string;
              dt: [string, { t: string }[]][];
            };
          },
        ],
      ],
    ][];
  }[];
  uros?: {
    ure: string;
    fl: string;
  }[];
  et: [string, string][];
  date: string;
  ld_link: {
    link_hw: string;
    link_fl: string;
  };
  suppl?: {
    examples: { t: string }[];
    ldq: {
      ldhw: string;
      fl: string;
      def: {
        sls?: string[];
        sseq: [
          [
            [
              'sense',
              {
                dt: [string, string][];
                sls?: string[];
              },
            ],
          ],
        ][];
      }[];
    };
  };
  shortdef: string[];
};

export const useDictionaryApi = ({
  word,
  onError,
}: {
  word: string;
  onError?: () => void;
}) => {
  const [data, setData] = useState<DictionaryEntry>();

  useEffect(() => {
    const baseUrl = 'https://api.kellyripple.com/dictionary' as const;
    fetch(`${baseUrl}/${word}`)
      .then((response) => {
        if (response.status === 404) {
          return onError?.();
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
        onError?.();
      });
  }, [word]);

  return { data };
};
