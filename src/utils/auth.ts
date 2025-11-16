export interface AuthPayload {
  token: string
  user?: { id?: string; name?: string; email?: string}
}

const AUTH_KEY = 'fitclub_auth'

export const loginLocal = (payload: AuthPayload) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload))
}

export const logoutLocal = () => {
  localStorage.removeItem(AUTH_KEY)
}

export const getAuth = (): AuthPayload | null => {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthPayload
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  const a = getAuth()
  return !!(a && a.token)
}
