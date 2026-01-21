import React, { useEffect, useState } from 'react'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Label, Input, Textarea, Button, Row, Chip, ErrorText, Muted } from '../../components/ui'

export default function ProviderBusiness() {
  const { user } = useAuth()
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const res = await api.providers.list({})
      const owned = res.providers.find(p => p.ownerUserId === user.id)
      setProvider(owned || null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  async function save() {
    if (!provider) return
    setError('')
    setSaving(true)
    try {
      const res = await api.providers.updateByOwner({
        ownerUserId: user.id,
        patch: {
          name: provider.name,
          specialty: provider.specialty,
          basePrice: Number(provider.basePrice) || 0,
          coverRadiusKm: Number(provider.coverRadiusKm) || 0,
          description: provider.description || ''
        }
      })
      setProvider(res.provider)
    } catch (err) {
      setError(err?.message || 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Title>Gestión de negocio</Title>
        <Spacer h={10} />

        <Button variant="outline" onClick={load} disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Actualizando…' : 'Actualizar'}
        </Button>
        <Spacer h={10} />

        {!provider ? (
          <Card><Muted>No se encontró un perfil de proveedor asociado a este usuario.</Muted></Card>
        ) : (
          <Card>
            <Row>
              <Chip>Radio: {provider.coverRadiusKm} km</Chip>
              <Chip>Precio base: ${provider.basePrice}</Chip>
              <Chip>⭐ {provider.rating}</Chip>
            </Row>

            <Label htmlFor="name">Nombre del negocio</Label>
            <Input id="name" value={provider.name} onChange={e => setProvider(p => ({ ...p, name: e.target.value }))} />

            <Label htmlFor="specialty">Tipo de servicio</Label>
            <Input id="specialty" value={provider.specialty} onChange={e => setProvider(p => ({ ...p, specialty: e.target.value }))} placeholder="Pastor, parrillada…" />

            <Label htmlFor="basePrice">Precio base</Label>
            <Input id="basePrice" type="number" min={0} value={provider.basePrice} onChange={e => setProvider(p => ({ ...p, basePrice: e.target.value }))} />

            <Label htmlFor="radius">Radio de cobertura (km)</Label>
            <Input id="radius" type="number" min={0} value={provider.coverRadiusKm} onChange={e => setProvider(p => ({ ...p, coverRadiusKm: e.target.value }))} />

            <Label htmlFor="desc">Descripción</Label>
            <Textarea id="desc" value={provider.description} onChange={e => setProvider(p => ({ ...p, description: e.target.value }))} />

            <Spacer h={12} />
            <Card style={{ background: '#fafafa' }} aria-label="Subida de fotos (placeholder)">
              <Muted>Subida de fotos de eventos (placeholder). En una versión completa se integraría carga de imágenes.</Muted>
            </Card>

            <Spacer h={14} />
            <Button onClick={save} disabled={saving} style={{ width: '100%' }}>
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </Button>
            {error ? <ErrorText role="alert">{error}</ErrorText> : null}
          </Card>
        )}

        <Spacer h={30} />
      </Container>
    </Page>
  )
}
