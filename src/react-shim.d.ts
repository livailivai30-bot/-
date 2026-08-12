declare module 'react' {
  export type ReactNode = unknown;
  export type PropsWithChildren<P = unknown> = P & { children?: ReactNode };
  export interface ChangeEvent<T = Element> { target: T }
  export interface DragEvent<T = Element> { preventDefault(): void; dataTransfer: DataTransfer; currentTarget: T }
  export function useState<T>(initial: T | (() => T)): [T, (value: T | ((previous: T) => T)) => void];
  export function useState<T = undefined>(): [T | undefined, (value: T | undefined | ((previous: T | undefined) => T | undefined)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  const React: { StrictMode: (props: PropsWithChildren) => unknown };
  export default React;
}

declare module 'react-dom/client' {
  export function createRoot(element: Element): { render(children: unknown): void };
}

declare module 'react/jsx-runtime' {
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}

declare namespace JSX {
  interface IntrinsicAttributes { key?: string | number }
  interface IntrinsicElements { [elementName: string]: unknown }
}
