import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Icon } from '@/components/Icon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
import type { ChangeEvent } from '@/types/event';

import '@/components/theme-fonts.css';
import '@/components/theme.css';

export function Theme({ children }: { children: ReactNode }) {
  const storageKey = 'guessTheWordTheme' as const;
  const themeCheckboxId = 'theme-toggle' as const;
  const onKeyDown = useOnKeyDown();

  const [savedTheme] = useState(
    document.documentElement.getAttribute('data-theme'),
  );

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    const themeColor =
      theme === 'light' ? 'var(--light-mode)' : 'var(--dark-mode)';
    document.documentElement.style.backgroundColor = themeColor;
    window.localStorage.setItem(storageKey, theme);
  }, []);

  const onChange = useCallback((event: ChangeEvent) => {
    setTheme(event.target.checked ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    if (!savedTheme) return;
    setTheme(savedTheme === 'light' ? 'light' : 'dark');
    document.documentElement.removeAttribute('data-theme');
  }, [savedTheme]);

  return (
    <>
      <input
        aria-hidden={true}
        defaultChecked={savedTheme === 'light'}
        id={themeCheckboxId}
        onChange={onChange}
        tabIndex={-1}
        type="checkbox"
      />
      <main className="theme">
        <div className="theme-wrapper">
          <label
            aria-label="theme toggle"
            className="theme-toggle-label"
            htmlFor={themeCheckboxId}
            id="theme-toggle-label"
            onKeyDown={onKeyDown}
            role="button"
            tabIndex={0}
          >
            <label className="theme-icon-label">Light</label>
            <div className="theme-icons">
              <div className="theme-icon">
                <Icon icon="sun" id="theme-light" />
              </div>
              <div className="theme-icon">
                <Icon icon="moon" id="theme-dark" />
              </div>
            </div>
            <label className="theme-icon-label">Dark</label>
          </label>
          {children}
        </div>
      </main>
    </>
  );
}
