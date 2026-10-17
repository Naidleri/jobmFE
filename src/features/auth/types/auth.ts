export type AuthRole = 'JOB_SEEKER' | 'COMPANY'

export type AuthUser = {
  id: string
  name: string
  role: AuthRole
}

export type LoginResponse = {
  token: string
  user: AuthUser
}
