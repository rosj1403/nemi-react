import React, { useEffect, useState } from 'react'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Row, Chip, Muted, Button } from '../../components/ui'

export default function ClientRequests() {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await api.requests.listForUser({ userId: user.id, role: 'client' })
      setRequests(res.requests)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Title>Mis solicitudes</Title>
        <Spacer h={10} />

        <Button variant="outline" onClick={load} disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Actualizando…' : 'Actualizar'}
        </Button>
        <Spacer h={10} />

        {requests.map(r => (
          <Card key={r.id}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800 }}>{r.providerName}</div>
              <Chip>{r.status}</Chip>
            </Row>
            <Spacer h={8} />
            <Muted><b>Fecha:</b> {r.date} · <b>Hora:</b> {r.time}</Muted>
            <Muted><b>Ubicación:</b> {r.address}</Muted>
            {r.notes ? <Muted><b>Notas:</b> {r.notes}</Muted> : null}
            {r.status === 'Rechazado' && r.rejectionReason ? (
              <Muted><b>Motivo:</b> {r.rejectionReason}</Muted>
            ) : null}
            <Spacer h={8} />
            <Muted style={{ fontSize: '0.9rem' }}>Creada: {new Date(r.createdAt).toLocaleString()}</Muted>
          </Card>
        ))}

        {requests.length === 0 ? (
          <Card><Muted>Aún no tienes solicitudes.</Muted></Card>
        ) : null}

        <Spacer h={30} />
      </Container>
    </Page>
  )
}
