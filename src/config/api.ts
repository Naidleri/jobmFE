const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || '/api'

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, '')

export function buildApiUrl(endpoint: string): string {
  const normalizedEndpoint = endpoint.replace(/^\/+/, '')

  return `${API_BASE_URL}/${normalizedEndpoint}`
}
