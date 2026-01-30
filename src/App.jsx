import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'

import ComponentShowcase from './pages/ComponentShowcase'

import Welcome from './pages/auth/Welcome'
import Login from './pages/auth/Login'
import RegisterClient from './pages/auth/RegisterClient'
import RegisterProvider from './pages/auth/RegisterProvider'
import RecoverPassword from './pages/auth/RecoverPassword'

import ClientHome from './pages/client/ClientHome'
import ProviderProfile from './pages/client/ProviderProfile'
import RequestForm from './pages/client/RequestForm'
import ClientRequests from './pages/client/ClientRequests'
import ClientFavorites from './pages/client/ClientFavorites'

import ProviderDashboard from './pages/provider/ProviderDashboard'
import ProviderOrders from './pages/provider/ProviderOrders'
import ProviderBusiness from './pages/provider/ProviderBusiness'

import Account from './pages/auth/Account'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/components" element={<ComponentShowcase />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/client" element={<RegisterClient />} />
        <Route path="/register/provider" element={<RegisterProvider />} />
        <Route path="/recover" element={<RecoverPassword />} />

        {/* Cliente */}
        <Route
          path="/c/home"
          element={
            <ProtectedRoute allowRoles={['client']}>
              <ClientHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/taquero/:id"
          element={
            <ProtectedRoute allowRoles={['client']}>
              <ProviderProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/c/request/:providerId"
          element={
            <ProtectedRoute allowRoles={['client']}>
              <RequestForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/c/requests"
          element={
            <ProtectedRoute allowRoles={['client']}>
              <ClientRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/c/favorites"
          element={
            <ProtectedRoute allowRoles={['client']}>
              <ClientFavorites />
            </ProtectedRoute>
          }
        />

        {/* Proveedor */}
        <Route
          path="/p/dashboard"
          element={
            <ProtectedRoute allowRoles={['provider']}>
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/p/orders"
          element={
            <ProtectedRoute allowRoles={['provider']}>
              <ProviderOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/p/business"
          element={
            <ProtectedRoute allowRoles={['provider']}>
              <ProviderBusiness />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <NavBar />
    </>
  )
}
