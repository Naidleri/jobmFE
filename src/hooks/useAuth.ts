import { useEffect, useState } from 'react'
import type { AuthUser } from '../features/auth/types/auth'

function readUser(): AuthUser | null {
  const token = localStorage.getItem('access_token')
  const savedUser = localStorage.getItem('user')

  if (!token || !savedUser) return null

  try {
    return JSON.parse(savedUser) as AuthUser
  } catch {
    return null
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(readUser)

  useEffect(() => {
    function updateUser() {
      setUser(readUser())
    }

    window.addEventListener('auth-changed', updateUser)
    window.addEventListener('storage', updateUser)

    return () => {
      window.removeEventListener('auth-changed', updateUser)
      window.removeEventListener('storage', updateUser)
    }
  }, [])

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('auth-changed'))
    window.location.href = '/login'
  }

  return {
    user,
    isAuthenticated: user !== null,
    logout,
  }
}
