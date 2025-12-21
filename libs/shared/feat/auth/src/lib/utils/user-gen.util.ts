/**
 * @requires NPM:bcryptjs
 * @requires NPM:nanoid
 *
 * @copyright © 2020-2025 by J. Quader
 * @author Dr. J. Quader
 */

import * as bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

/**
 * Generates a sample user dataset document based on a given username.
 * The password is a bcrypt hashed value of the username.
 *
 * @summary Generate sample user dataset.
 * @param {string} username - The username to generate the user data for.
 * @returns {Object} An object representing a user dataset document, including userId, hashed password, creation date, specialty, language, and roles.
 */
export function generateUser(username: string) {
  const roles = ['user', 'editor', 'expert', 'translator', 'admin'] as const
  return {
    userId: nanoid(),
    username,
    password: bcrypt.hashSync(username, 10),
    createdAt: new Date(),
    speciality: ['paediatrics'],
    language: 'de',
    roles: roles.includes(username as any) ? [username] : []
  }
}
