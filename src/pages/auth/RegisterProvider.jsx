import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, Container, Page, Spacer, Title, Label, Input, Button, ErrorText } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'

export default function RegisterProvider() {
  const nav = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ role: 'provider', name, email, password })
      nav('/p/dashboard', { replace: true })
    } catch (err) {
      setError(err?.message || 'No se pudo registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Container>
        <Spacer h={18} />
        <Card>
          <Title>Registro de Proveedor/Taquero</Title>
          <form onSubmit={onSubmit} aria-label="Formulario de registro de proveedor">
            <Label htmlFor="name">Nombre del negocio</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} required />

            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

            <Spacer h={14} />
            <Button type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Creando…' : 'Crear cuenta'}
            </Button>
            {error ? <ErrorText role="alert">{error}</ErrorText> : null}
          </form>

          <Spacer h={10} />
          <Link to="/login">Volver a iniciar sesión</Link>
        </Card>
      </Container>
    </Page>
  )
}
