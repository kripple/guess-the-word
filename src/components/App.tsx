import { Theme } from '@/components/Theme';

// import '@/components/app.css';

export function App() {
  const themeToggleId = 'theme-toggle' as const;
  return (
    <Theme themeToggleId={themeToggleId}>
      <label
        aria-label="theme toggle"
        className="header-item theme-toggle-label"
        htmlFor={themeToggleId}
        id="theme-toggle-label"
        role="button"
        tabIndex={0}
      >
        <span id="sun">SUN</span>
        <span id="moon">MOON</span>
      </label>
    </Theme>
  );
}
