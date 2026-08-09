import { USERS } from '../data/fixtures'

export function signIn(email, password) {
  const user = USERS[email.toLowerCase().trim()]
  if (!user || user.password !== password) {
    return { ok: false, error: 'Incorrect email or password.' }
  }
  return { ok: true, user: { id: user.id, name: user.name, role: user.role } }
}

export function signUp(data) {
  if (USERS[data.email?.toLowerCase().trim()]) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  return { ok: true }
}

export function requestOtp() {
  return { ok: true, hint: '482913' }
}

export function verifyOtp(code) {
  if (code === '482913' || code.length === 6) {
    return { ok: true }
  }
  return { ok: false, error: 'That code is invalid.' }
}

export function resetPassword() {
  return { ok: true }
}

export function changePassword(currentPassword) {
  if (currentPassword !== 'password') {
    return { ok: false, error: 'Your current password is incorrect.' }
  }
  return { ok: true }
}
