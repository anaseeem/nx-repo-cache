import 'next-auth'
import type { DefaultSession } from 'next-auth'
declare module 'next-auth' {
  interface Session {
    user: {
      roles: string[] | null | undefined
      username?: string | null | undefined
      isInitialPwd?: boolean | null | undefined
    } & DefaultSession['user']
  }
}
