export type JwtUser = {
  sub?: string | undefined
  id?: string | undefined
  username?: string | undefined
  roles?: string[] | undefined
  professionalGroup?: string | undefined
  iat?: number | undefined
  exp?: number | undefined
  group?: string | undefined
}

export type HeaderUser = {
  id?: string
  username?: string
  roles?: string[]
  professionalGroup?: string
  iat?: number
  exp?: number
}
