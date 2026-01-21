import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Row, Chip, Muted, Button } from '../../components/ui'

export default function ProviderProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const [provider, setProvider] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const [pRes, fRes] = await Promise.all([
        api.providers.getById(id),
        api.favorites.list({ userId: user.id })
      ])
      setProvider(pRes.provider)
      setFavorites(fRes.favorites)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id]) // eslint-disable-line

  async function onToggleFav() {
    const res = await api.favorites.toggle({ userId: user.id, providerId: id })
    setFavorites(res.favorites)
  }

  if (loading || !provider) {
    return (
      <Page>
        <Container>
          <Spacer h={18} />
          <Card><Muted>Cargando…</Muted></Card>
        </Container>
      </Page>
    )
  }

  const fav = favorites.includes(provider.id)

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Card>
          <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Title style={{ margin: 0 }}>{provider.name}</Title>
            <Button variant={fav ? 'danger' : 'outline'} onClick={onToggleFav} aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
              {fav ? '♥' : '♡'}
            </Button>
          </Row>

          <Row>
            <Chip>{provider.specialty}</Chip>
            <Chip>⭐ {provider.rating}</Chip>
            {provider.badges?.map(b => <Chip key={b}>{b}</Chip>) }
          </Row>

          <Spacer h={10} />
          <Muted>{provider.description || 'Sin descripción.'}</Muted>

          <Spacer h={14} />
          <Card style={{ background: '#fafafa' }} aria-label="Galería de fotos (placeholder)">
            <Muted>Galería de fotos (placeholder). En una versión completa aquí se muestran imágenes del proveedor.</Muted>
          </Card>

          <Spacer h={14} />
          <div style={{ fontWeight: 800 }}>Paquetes</div>
          <Spacer h={8} />
          {provider.packages?.length ? (
            provider.packages.map(pk => (
              <Card key={pk.id} style={{ background: '#fafafa' }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <div>{pk.title}</div>
                  <div style={{ fontWeight: 800 }}>${pk.price}</div>
                </Row>
              </Card>
            ))
          ) : (
            <Muted>Este proveedor aún no ha publicado paquetes.</Muted>
          )}

          <Spacer h={14} />
          <div style={{ fontWeight: 800 }}>Reseñas</div>
          <Spacer h={8} />
          {provider.reviews?.length ? (
            provider.reviews.map(rv => (
              <Card key={rv.id} style={{ background: '#fafafa' }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700 }}>{rv.author}</div>
                  <Chip>⭐ {rv.stars}</Chip>
                </Row>
                <Spacer h={6} />
                <Muted>{rv.text}</Muted>
              </Card>
            ))
          ) : (
            <Muted>Aún no hay reseñas.</Muted>
          )}

          <Spacer h={16} />
          <Row>
            <Link to={`/c/request/${provider.id}`} style={{ flex: 1 }}>
              <Button style={{ width: '100%' }}>Solicitar servicio</Button>
            </Link>
            <Link to="/c/home" style={{ flex: 1 }}>
              <Button variant="outline" style={{ width: '100%' }}>Volver</Button>
            </Link>
          </Row>
        </Card>
      </Container>
    </Page>
  )
}
