import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Label, Input, Textarea, Button, ErrorText, Muted } from '../../components/ui'

export default function RequestForm() {
  const { providerId } = useParams()
  const nav = useNavigate()
  const { user } = useAuth()
  const [provider, setProvider] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.providers.getById(providerId).then(r => setProvider(r.provider)).catch(() => setProvider(null))
  }, [providerId])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.requests.create({
        clientUserId: user.id,
        providerId,
        payload: { date, time, address, notes }
      })
      nav('/c/requests', { replace: true })
    } catch (err) {
      setError(err?.message || 'No se pudo crear la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Card>
          <Title>Formulario de solicitud</Title>
          <Muted>Proveedor: {provider?.name || providerId}</Muted>

          <Spacer h={12} />
          <form onSubmit={onSubmit} aria-label="Formulario de solicitud">
            <Label htmlFor="date">Fecha</Label>
            <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />

            <Label htmlFor="time">Hora</Label>
            <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} required />

            <Label htmlFor="address">Ubicación del evento</Label>
            <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección o referencia" required />

            <Spacer h={10} />
            <Card style={{ background: '#fafafa' }} aria-label="Mapa (placeholder)">
              <Muted>Mapa para seleccionar ubicación (placeholder). En una versión completa aquí se marcaría un pin.</Muted>
            </Card>

            <Label htmlFor="notes">Notas especiales</Label>
            <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Número de personas, restricciones, horario de montaje…" />

            <Spacer h={14} />
            <Button type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Enviando…' : 'Enviar solicitud'}
            </Button>
            {error ? <ErrorText role="alert">{error}</ErrorText> : null}
          </form>
        </Card>
      </Container>
    </Page>
  )
}
