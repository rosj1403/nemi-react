import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/mockApi'

const AuthContext = createContext(null)

const STORAGE_KEY = 'nemi_auth'

function safeParse(json) {
  try { return JSON.parse(json) } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, role: 'client'|'provider', name, email }

  useEffect(() => {
    const cached = safeParse(localStorage.getItem(STORAGE_KEY))
    if (cached?.user) setUser(cached.user)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }))
  }, [user])

  async function login({ email, password }) {
    const result = await api.auth.login({ email, password })
    setUser(result.user)
    return result
  }

  async function register({ role, name, email, password }) {
    const result = await api.auth.register({ role, name, email, password })
    setUser(result.user)
    return result
  }

  function logout() {
    setUser(null)
  }

  const value = useMemo(() => ({ user, isAuthed: !!user, login, register, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
