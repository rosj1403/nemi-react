import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Page, Spacer, Title, Subtitle, Button, Chip, Row } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'

export default function Account() {
  const { user, logout } = useAuth()
  const nav = useNavigate()

  function onLogout() {
    logout()
    nav('/', { replace: true })
  }

  return (
    <Page>
      <Container>
        <Spacer h={18} />
        <Card>
          <Title>Cuenta</Title>
          <Row>
            <Chip>Rol: {user?.role}</Chip>
            <Chip>Usuario: {user?.name}</Chip>
          </Row>
          <Spacer h={10} />
          <Subtitle>{user?.email}</Subtitle>

          <Spacer h={14} />
          <Button variant="danger" onClick={onLogout} style={{ width: '100%' }}>
            Cerrar sesión
          </Button>
        </Card>
      </Container>
    </Page>
  )
}
