export interface UserToken {
  id: number
  name: string
  email: string
  role: string
  verified: boolean
  iat: number
  exp: number
}
