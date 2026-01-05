/**
 * @copyright © 2020-2025 by J. Quader
 * @author Dr. J. Quader
 */

/**
 * Checks if the current user has any of the required roles.
 *
 * @param {string[]} required - An array of roles required to pass this guard.
 * @param {string[]} userRoles - An array of roles assigned to the current user.
 * @returns {boolean} True if the user has at least one of the needed roles; otherwise, false.
 */
export function hasRole(
  required: string[] = [],
  userRoles: string[] = []
): boolean {
  if (!required.length) return true // no roles required → always pass
  const set = new Set(userRoles ?? [])
  return required.some((r) => set.has(r)) // any required role in userRoles?
}
