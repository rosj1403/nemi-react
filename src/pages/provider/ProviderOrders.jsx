import React, { useEffect, useState } from 'react'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Row, Chip, Muted, Button, Label, Input } from '../../components/ui'

export default function ProviderOrders() {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [rejectReasonById, setRejectReasonById] = useState({})

  async function load() {
    setLoading(true)
    try {
      const res = await api.requests.listForUser({ userId: user.id, role: 'provider' })
      setRequests(res.requests)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  async function accept(id) {
    await api.requests.updateStatus({ requestId: id, status: 'Aceptado' })
    await load()
  }

  async function reject(id) {
    const reason = rejectReasonById[id] || 'No especificado'
    await api.requests.updateStatus({ requestId: id, status: 'Rechazado', rejectionReason: reason })
    await load()
  }

  async function complete(id) {
    await api.requests.updateStatus({ requestId: id, status: 'Completado' })
    await load()
  }

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Title>Administrador de pedidos</Title>
        <Spacer h={10} />

        <Button variant="outline" onClick={load} disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Actualizando…' : 'Actualizar'}
        </Button>
        <Spacer h={10} />

        {requests.map(r => (
          <Card key={r.id}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800 }}>{r.date} {r.time}</div>
              <Chip>{r.status}</Chip>
            </Row>
            <Spacer h={8} />
            <Muted><b>Ubicación:</b> {r.address}</Muted>
            {r.notes ? <Muted><b>Notas:</b> {r.notes}</Muted> : null}

            <Spacer h={12} />

            {r.status === 'Pendiente' ? (
              <>
                <Row>
                  <Button onClick={() => accept(r.id)} style={{ flex: 1 }}>Aceptar</Button>
                  <Button variant="danger" onClick={() => reject(r.id)} style={{ flex: 1 }}>Rechazar</Button>
                </Row>
                <Spacer h={10} />
                <Label htmlFor={`reason_${r.id}`}>Motivo de rechazo (si aplica)</Label>
                <Input
                  id={`reason_${r.id}`}
                  value={rejectReasonById[r.id] || ''}
                  onChange={e => setRejectReasonById(prev => ({ ...prev, [r.id]: e.target.value }))}
                  placeholder="Ej. Fuera de radio de cobertura, fecha ocupada, etc."
                />
              </>
            ) : null}

            {r.status === 'Aceptado' ? (
              <>
                <Row>
                  <Button variant="outline" onClick={() => complete(r.id)} style={{ width: '100%' }}>
                    Marcar como completado
                  </Button>
                </Row>
              </>
            ) : null}

            {r.status === 'Rechazado' ? (
              <Muted><b>Motivo:</b> {r.rejectionReason || 'No especificado'}</Muted>
            ) : null}

            <Spacer h={8} />
            <Muted style={{ fontSize: '0.9rem' }}>Creada: {new Date(r.createdAt).toLocaleString()}</Muted>
          </Card>
        ))}

        {requests.length === 0 ? (
          <Card><Muted>No tienes solicitudes aún.</Muted></Card>
        ) : null}

        <Spacer h={30} />
      </Container>
    </Page>
  )
}
