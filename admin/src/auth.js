// auth.js - utilitário para JWT no frontend
export function saveToken(token) {
  localStorage.setItem('jwt_token', token)
}

export function getToken() {
  return localStorage.getItem('jwt_token')
}

export function removeToken() {
  localStorage.removeItem('jwt_token')
}

// Decodifica o payload do JWT (base64)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join('')))
  } catch (e) {
    return null
  }
}

export function isTokenExpired() {
  const token = getToken()
  if (!token) return true
  const payload = parseJwt(token)
  if (!payload || !payload.exp) return true
  const now = Math.floor(Date.now() / 1000)
  return payload.exp < now
}

export function getUserRole() {
  const token = getToken()
  if (!token) return null
  const payload = parseJwt(token)
  return payload && payload.role ? payload.role : 'admin'
}

// Wrapper para fetch que já inclui o token JWT
export async function authFetch(url, options = {}) {
  const token = getToken()
  options.headers = options.headers || {}
  if (token) {
    options.headers['Authorization'] = 'Bearer ' + token
  }
  return fetch(url, options)
}
