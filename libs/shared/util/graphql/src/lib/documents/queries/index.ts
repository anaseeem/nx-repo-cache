import { readFileSync } from 'fs'
import { join } from 'path'

export const error = readFileSync(join(__dirname, 'error.gql'), 'utf8')

/** Admin */
export const getUser = readFileSync(
  join(__dirname, 'admin/getUser.gql'),
  'utf8'
)
export const getUsers = readFileSync(
  join(__dirname, 'admin/getUsers.gql'),
  'utf8'
)

/** Article */
export const articleGetContent = readFileSync(
  join(__dirname, 'article/articleContent.gql'),
  'utf8'
)

/** Upload */
export const getFiles = readFileSync(
  join(__dirname, 'upload/getFiles.gql'),
  'utf8'
)
