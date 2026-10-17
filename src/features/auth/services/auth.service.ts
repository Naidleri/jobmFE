import { buildApiUrl } from '../../../config/api'
import type { LoginResponse } from '../types/auth'

function getErrorMessage(message: unknown): string {
  if (Array.isArray(message)) return message.join(', ')
  if (typeof message === 'string' && message.length > 0) return message
  return 'Terjadi kesalahan pada server'
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(buildApiUrl('/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(getErrorMessage(body.message))
  }

  return body as LoginResponse
}

export async function registerJobSeeker(
  name: string,
  email: string,
  password: string,
) {
  return register('/auth/register/job-seeker', {
    name,
    email,
    password,
  })
}

export async function registerCompany(
  name: string,
  email: string,
  password: string,
  description: string,
) {
  return register('/auth/register/company', {
    name,
    email,
    password,
    description,
  })
}

async function register(
  endpoint: string,
  data: Record<string, string>,
) {
  const response = await fetch(buildApiUrl(endpoint), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(getErrorMessage(body.message))
  }

  return body
}
