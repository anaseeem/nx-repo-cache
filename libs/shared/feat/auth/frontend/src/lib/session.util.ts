/**
 * @requires NPM:next-auth
 *
 * @author Dr. J. Quader
 * @copyright © 2020-2025 by J. Quader
 */
import type { Session } from 'next-auth'

/**
 * Retrieves the roles of the current user and categorizes them into admin and editor statuses.
 *
 * @param {Object} param - Parameter object containing user session data.
 * @param {Session | null} param.data - The next-auth user object/session.
 * @returns {Object} Object containing isAdmin, isEditor, and isEditorOnly status flags.
 */
export function getRoles({ data }: { data: Session | null }) {
  const roles = data?.user?.roles ?? []
  const isAdmin = roles.includes('admin')
  const isEditor = roles.includes('editor')
  const isEditorOnly = isEditor && !isAdmin
  return { isAdmin, isEditor, isEditorOnly }
}
