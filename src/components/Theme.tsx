import type { ReactNode } from 'react';

// import '@/components/theme-font-regular.css';
// import '@/components/theme-font-italic.css';
// import '@/components/theme-font.css';
// import '@/components/theme.css';

export function Theme({
  children,
  themeToggleId,
}: {
  children: ReactNode;
  themeToggleId: string;
}) {
  return (
    <>
      <input
        aria-hidden={true}
        id={themeToggleId}
        tabIndex={-1}
        type="checkbox"
      />
      <main className="theme">{children}</main>
    </>
  );
}
