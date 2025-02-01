import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import { useEffect, useState } from 'react';

export const useGoogleSheets = () => {
  const spreadsheetId = '1S9OrkKnaKlFM1HzYLoPH__8YoLVhxnoMaa5tAUzUSeM' as const;
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(spreadsheetId);
    parser.parse().then((data) => {
      if (!data || !Array.isArray(data)) {
        console.warn('unexpected response');
        return;
      }
      setData(
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

  return { data };
};
