import { useCallback } from 'react';

import type { KeyboardEvent } from '@/types/event';

export const useOnKeyDown = () => {
  return useCallback((event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      event.currentTarget.click();
    }
    if (event.code === 'Escape') {
      event.currentTarget.blur();
    }
  }, []);
};
