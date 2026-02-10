import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Row, Chip, Muted, Button } from '../../components/ui'
import styled from 'styled-components'

const Banner = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  min-height: 200px;
  background: #eee;
`

const BannerImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
`

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.55));
  display: flex;
  align-items: flex-end;
  padding: 16px;
  color: #fff;
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
`

const GalleryImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #eee;
`

const StatRow = styled.div`
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

const FALLBACK_PHOTOS = [
  'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561d1b?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1585238341710-4b51926f5f90?auto=format&fit=crop&w=1200&h=600&q=80'
]

export default function ProviderProfile() {
  const { id } = useParams()
  const { user } = useAuth()
  const [provider, setProvider] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const [pRes, fRes] = await Promise.all([
        api.providers.getById(id),
        api.favorites.list({ userId: user.id })
      ])
      setProvider(pRes.provider)
      setFavorites(fRes.favorites)
    } catch (err) {
      setProvider(null)
      setError(err?.message || 'No se pudo cargar el proveedor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id]) // eslint-disable-line

  async function onToggleFav() {
    const res = await api.favorites.toggle({ userId: user.id, providerId: id })
    setFavorites(res.favorites)
  }

  const photos = useMemo(() => {
    if (provider?.photos?.length) return provider.photos
    return FALLBACK_PHOTOS
  }, [provider?.photos])

  if (loading || !provider) {
    return (
      <Page>
        <Container>
          <Spacer h={18} />
          <Card>
            <Muted>{loading ? 'Cargando…' : (error || 'Proveedor no disponible')}</Muted>
            <Spacer h={10} />
            <Link to="/home">
              <Button variant="outline">Volver a inicio</Button>
            </Link>
          </Card>
        </Container>
      </Page>
    )
  }

  const fav = favorites.includes(provider.id)

  const mapLat = provider.lat ?? 19.4326
  const mapLng = provider.lng ?? -99.1332
  const mapDelta = 0.02
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - mapDelta}%2C${mapLat - mapDelta}%2C${mapLng + mapDelta}%2C${mapLat + mapDelta}&layer=mapnik&marker=${mapLat}%2C${mapLng}`

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Card>
          <Banner aria-label="Banner del proveedor">
            <BannerImage
              src={photos[0]}
              alt={`Banner de ${provider.name}`}
              onError={(e) => {
                const fallback = FALLBACK_PHOTOS[0]
                if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
              }}
            />
            <BannerOverlay>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{provider.name}</div>
                  <div style={{ opacity: 0.9 }}>{provider.specialty} · ⭐ {provider.rating}</div>
                </div>
                <Button variant={fav ? 'danger' : 'outline'} onClick={onToggleFav} aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
                  {fav ? '♥' : '♡'}
                </Button>
              </div>
            </BannerOverlay>
          </Banner>

          <Spacer h={12} />
          <Row>
            <Chip>{provider.specialty}</Chip>
            <Chip>⭐ {provider.rating}</Chip>
            {provider.badges?.map(b => <Chip key={b}>{b}</Chip>) }
          </Row>

          <Spacer h={10} />
          <Muted>{provider.description || 'Sin descripción.'}</Muted>

          <Spacer h={14} />
          <StatRow>
            <StatCard>
              <div style={{ fontWeight: 700 }}>{provider.yearsActive || 1} años</div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Experiencia</div>
            </StatCard>
            <StatCard>
              <div style={{ fontWeight: 700 }}>{provider.avgResponseHours || 2} h</div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Respuesta</div>
            </StatCard>
            <StatCard>
              <div style={{ fontWeight: 700 }}>{provider.coverRadiusKm || 10} km</div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>Cobertura</div>
            </StatCard>
          </StatRow>

          <Spacer h={14} />
          <div style={{ fontWeight: 800 }}>Galería</div>
          <Spacer h={8} />
          <GalleryGrid>
            {photos.slice(0, 6).map((src, idx) => (
              <GalleryImage
                key={`${provider.id}_photo_${idx}`}
                src={src}
                alt={`Foto ${idx + 1} de ${provider.name}`}
                onError={(e) => {
                  const fallback = FALLBACK_PHOTOS[idx % FALLBACK_PHOTOS.length]
                  if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                }}
              />
            ))}
          </GalleryGrid>

          <Spacer h={14} />
          <Card style={{ padding: 0, overflow: 'hidden' }} aria-label="Ubicación del proveedor">
            <iframe
              title="Mapa del proveedor"
              src={mapSrc}
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
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
              <Link to={`/request/${provider.id}`} style={{ flex: 1 }}>
              <Button style={{ width: '100%' }}>Solicitar servicio</Button>
            </Link>
              <Link to="/home" style={{ flex: 1 }}>
              <Button variant="outline" style={{ width: '100%' }}>Volver</Button>
            </Link>
          </Row>
        </Card>
      </Container>
    </Page>
  )
}
