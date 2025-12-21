export const toUndef = <T>(v: T | null | undefined): T | undefined =>
  v ?? undefined

export function flattenPayload<T extends { user?: any }>(p: T): any {
  return (p as any)?.user ? (p as any).user : p
}
