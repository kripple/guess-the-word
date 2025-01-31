import type { ReactNode } from 'react';

import { Icon } from '@/components/Icon';

// import '@/components/theme-font-regular.css';
// import '@/components/theme-font-italic.css';
// import '@/components/theme-font.css';
import '@/components/theme.css';

export function Theme({ children }: { children: ReactNode }) {
  const themeCheckboxId = 'theme-toggle' as const;
  return (
    <>
      <input
        aria-hidden={true}
        id={themeCheckboxId}
        tabIndex={-1}
        type="checkbox"
      />
      <main className="theme">
        <label
          aria-label="theme toggle"
          className="theme-toggle-label"
          htmlFor={themeCheckboxId}
          id="theme-toggle-label"
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
      </main>
    </>
  );
}
