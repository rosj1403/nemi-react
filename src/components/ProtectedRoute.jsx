import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, allowRoles }) {
  const { user, isAuthed } = useAuth()
  if (!isAuthed) return <Navigate to="/login" replace />
  if (allowRoles && user && !allowRoles.includes(user.role)) return <Navigate to="/account" replace />
  return children
}
