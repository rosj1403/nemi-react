import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Container, Page, Spacer, Title, Label, Input, Button, ErrorText } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user } = await login({ email, password })
      nav(user.role === 'client' ? '/c/home' : '/p/dashboard', { replace: true })
    } catch (err) {
      setError(err?.message || 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Container>
        <Spacer h={18} />
        <Card>
          <Title>Iniciar sesión</Title>
          <form onSubmit={onSubmit} aria-label="Formulario de inicio de sesión">
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />

            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />

            <Spacer h={14} />
            <Button type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>
            {error ? <ErrorText role="alert">{error}</ErrorText> : null}
          </form>

          <Spacer h={10} />
          <Link to="/recover">¿Olvidaste tu contraseña?</Link>
          <Spacer h={10} />
          <div>
            <Link to="/register/client">Registro Cliente</Link> · <Link to="/register/provider">Registro Proveedor</Link>
          </div>
        </Card>
      </Container>
    </Page>
  )
}
