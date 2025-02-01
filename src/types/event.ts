import type {
  MouseEvent,
  ChangeEvent as ReactChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';

export type ClickEvent = MouseEvent<HTMLButtonElement>;

export type OnClick = (event: ClickEvent) => void;

export type ChangeEvent = ReactChangeEvent<HTMLInputElement>;

export type KeyboardEvent = ReactKeyboardEvent<
  HTMLLabelElement & HTMLButtonElement
>;
