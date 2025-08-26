// Centraliza a base da API para funcionar via LAN e produção
// Ordem: VITE_API_BASE -> localStorage.API_BASE -> host atual + :8000
const proto = window.location.protocol || 'http:'
const host = window.location.hostname || 'localhost'
const defaultBase = `${proto}//${host}:8000`

export const API_BASE = (import.meta?.env?.VITE_API_BASE) || window.localStorage.getItem('API_BASE') || defaultBase

export function api(path = '/') {
  if (!path.startsWith('/')) path = '/' + path
  return `${API_BASE}${path}`
}
