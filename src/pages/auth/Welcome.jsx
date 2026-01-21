import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Container, Page, Spacer, Title, Subtitle, Button } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'

export default function Welcome() {
  const { user } = useAuth()
  const nav = useNavigate()

  React.useEffect(() => {
    if (user?.role === 'client') nav('/c/home', { replace: true })
    if (user?.role === 'provider') nav('/p/dashboard', { replace: true })
  }, [user, nav])

  return (
    <Page>
      <Container>
        <Spacer h={18} />
        <Card>
          <Title>NEMI</Title>
          <Subtitle>Marketplace de taquizas y parrilladas con enfoque en geolocalización y accesibilidad.</Subtitle>

          <Spacer h={8} />

          <Link to="/login">
            <Button style={{ width: '100%' }}>Iniciar sesión</Button>
          </Link>

          <Spacer h={10} />

          <Link to="/register/client">
            <Button variant="outline" style={{ width: '100%' }}>Registro Cliente</Button>
          </Link>

          <Spacer h={10} />

          <Link to="/register/provider">
            <Button variant="outline" style={{ width: '100%' }}>Registro Proveedor/Taquero</Button>
          </Link>

          <Spacer h={12} />
          <Subtitle style={{ fontSize: '0.95rem' }}>
            Demo rápida: usa <b>cliente@nemi.mx</b> / <b>123456</b> o <b>taquero@nemi.mx</b> / <b>123456</b>
          </Subtitle>
        </Card>
      </Container>
    </Page>
  )
}
