import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Row, Chip, Muted, Button } from '../../components/ui'

export default function ProviderDashboard() {
  const { user } = useAuth()
  const [provider, setProvider] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const [pRes, rRes] = await Promise.all([
        api.providers.list({}),
        api.requests.listForUser({ userId: user.id, role: 'provider' })
      ])
      const owned = pRes.providers.find(p => p.ownerUserId === user.id)
      setProvider(owned || null)
      setRequests(rRes.requests)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  const stats = useMemo(() => {
    const pending = requests.filter(r => r.status === 'Pendiente').length
    const accepted = requests.filter(r => r.status === 'Aceptado').length
    const completed = requests.filter(r => r.status === 'Completado').length
    return { pending, accepted, completed }
  }, [requests])

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Title>Tablero del proveedor</Title>
        <Spacer h={10} />

        <Button variant="outline" onClick={load} disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Actualizando…' : 'Actualizar'}
        </Button>
        <Spacer h={12} />

        <Card>
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 800 }}>{provider?.name || user.name}</div>
            <Chip>⭐ {provider?.rating ?? 0}</Chip>
          </Row>
          <Spacer h={10} />
          <Row>
            <Chip>Nuevas: {stats.pending}</Chip>
            <Chip>Confirmadas: {stats.accepted}</Chip>
            <Chip>Completadas: {stats.completed}</Chip>
          </Row>
          <Spacer h={10} />
          <Muted>Tip: revisa “Pedidos” para aceptar/rechazar solicitudes.</Muted>
        </Card>

        <Spacer h={12} />
        <Card>
          <div style={{ fontWeight: 800 }}>Próximas solicitudes</div>
          <Spacer h={8} />
          {requests.slice(0, 3).map(r => (
            <Card key={r.id} style={{ background: '#fafafa' }}>
              <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div><b>{r.date}</b> {r.time}</div>
                <Chip>{r.status}</Chip>
              </Row>
              <Spacer h={6} />
              <Muted><b>Ubicación:</b> {r.address}</Muted>
              {r.notes ? <Muted><b>Notas:</b> {r.notes}</Muted> : null}
            </Card>
          ))}
          {requests.length === 0 ? <Muted>No tienes solicitudes aún.</Muted> : null}
        </Card>

        <Spacer h={30} />
      </Container>
    </Page>
  )
}
