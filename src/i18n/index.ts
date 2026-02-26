import { en } from './en';

type PathsToLeaf<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends string
    ? `${Prefix}${K & string}`
    : PathsToLeaf<T[K], `${Prefix}${K & string}.`>;
}[keyof T];

type NestedValue<T, Path extends string> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? NestedValue<T[Key], Rest>
    : never
  : Path extends keyof T
  ? T[Path]
  : never;

function get(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

export function useTranslations<Namespace extends keyof typeof en>(namespace: Namespace) {
  type NS = (typeof en)[Namespace];
  type Keys = PathsToLeaf<NS>;

  return function t(key: Keys): string {
    return get(en[namespace] as Record<string, unknown>, key as string);
  };
}
