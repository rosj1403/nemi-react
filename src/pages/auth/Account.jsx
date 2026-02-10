import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Page, Spacer, Title, Subtitle, Button, Chip, Row } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'
import styled from 'styled-components'
import { api } from '../../lib/mockApi'

const Banner = styled.div`
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #00b894 0%, #009c7a 100%);
  color: white;
  padding: 20px;
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
`

const StatCard = styled.div`
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
`

export default function Account() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [stats, setStats] = useState({ favorites: 0, requests: 0, orders: 0 })
  const [providerName, setProviderName] = useState('')

  useEffect(() => {
    if (!user) return
    const load = async () => {
      try {
        if (user.role === 'client') {
          const [fav, req] = await Promise.all([
            api.favorites.list({ userId: user.id }),
            api.requests.listForUser({ userId: user.id, role: 'client' })
          ])
          setStats({ favorites: fav.favorites.length, requests: req.requests.length, orders: 0 })
        } else {
          const [req, prov] = await Promise.all([
            api.requests.listForUser({ userId: user.id, role: 'provider' }),
            api.providers.getByOwner(user.id)
          ])
          setProviderName(prov.provider?.name || '')
          setStats({ favorites: 0, requests: 0, orders: req.requests.length })
        }
      } catch {
        setStats({ favorites: 0, requests: 0, orders: 0 })
        setProviderName('')
      }
    }
    load()
  }, [user])

  function onLogout() {
    logout()
    nav('/', { replace: true })
  }

  return (
    <Page>
      <Container>
        <Spacer h={18} />
        <Card>
          <Banner>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{user?.name}</div>
            <div style={{ opacity: 0.9 }}>{user?.role === 'provider' ? (providerName || 'Proveedor') : 'Cliente'}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>{user?.email}</div>
          </Banner>

          <Spacer h={14} />
          <Title>Resumen</Title>
          <StatGrid>
            {user?.role === 'client' ? (
              <>
                <StatCard>
                  <div style={{ fontWeight: 800 }}>{stats.favorites}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Favoritos</div>
                </StatCard>
                <StatCard>
                  <div style={{ fontWeight: 800 }}>{stats.requests}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>Solicitudes</div>
                </StatCard>
              </>
            ) : (
              <StatCard>
                <div style={{ fontWeight: 800 }}>{stats.orders}</div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>Pedidos</div>
              </StatCard>
            )}
          </StatGrid>

          <Spacer h={14} />
          <Row>
            <Chip>Rol: {user?.role}</Chip>
            <Chip>Usuario: {user?.name}</Chip>
          </Row>

          <Spacer h={14} />
          <Button variant="danger" onClick={onLogout} style={{ width: '100%' }}>
            Cerrar sesión
          </Button>
        </Card>
      </Container>
    </Page>
  )
}
