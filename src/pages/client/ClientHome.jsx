import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { useGeolocation } from '../../hooks/useGeolocation'
import {
  Card, Container, Page, Spacer, Title, Label, Input, Button, Row, Chip, Muted
} from '../../components/ui'
import styled from 'styled-components'

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`

const Two = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  @media (min-width: 820px) {
    grid-template-columns: 380px 1fr;
  }
`

function formatKm(km) {
  if (km == null) return ''
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

export default function ClientHome() {
  const { user } = useAuth()
  const { coords, status } = useGeolocation()
  const [q, setQ] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    minRating: 0,
    maxBasePrice: 99999,
    specialty: ''
  })
  const [providers, setProviders] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  const location = useMemo(() => {
    // Si no hay permiso, se sigue operando sin distancia.
    if (!coords) return null
    return coords
  }, [coords])

  async function load() {
    setLoading(true)
    try {
      const [pRes, fRes] = await Promise.all([
        api.providers.list({ location, q, filters }),
        api.favorites.list({ userId: user.id })
      ])
      setProviders(pRes.providers)
      setFavorites(fRes.favorites)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  async function onToggleFav(providerId) {
    const res = await api.favorites.toggle({ userId: user.id, providerId })
    setFavorites(res.favorites)
  }

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Title>Explorar</Title>
        <Muted>
          Ubicación: {status === 'granted' ? 'permitida' : status === 'denied' ? 'denegada' : status}
        </Muted>
        <Spacer h={10} />

        <Two>
          <Card aria-label="Buscador y filtros">
            <Label htmlFor="q">Buscar</Label>
            <Input id="q" value={q} onChange={e => setQ(e.target.value)} placeholder="Pastor, parrillada, nombre…" />

            <Spacer h={10} />
            <Row>
              <Button onClick={load} disabled={loading} style={{ flex: 1 }}>
                {loading ? 'Cargando…' : 'Buscar'}
              </Button>
              <Button variant="outline" onClick={() => setFiltersOpen(v => !v)} style={{ flex: 1 }}>
                {filtersOpen ? 'Ocultar filtros' : 'Filtros'}
              </Button>
            </Row>

            {filtersOpen ? (
              <>
                <Spacer h={12} />
                <Label htmlFor="specialty">Tipo de carne/servicio</Label>
                <Input id="specialty" value={filters.specialty} onChange={e => setFilters(f => ({ ...f, specialty: e.target.value }))} placeholder="Pastor, parrillada…" />

                <Label htmlFor="minRating">Valoración mínima (0-5)</Label>
                <Input
                  id="minRating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={filters.minRating}
                  onChange={e => setFilters(f => ({ ...f, minRating: Number(e.target.value) }))}
                />

                <Label htmlFor="maxPrice">Precio base máximo</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  min={0}
                  value={filters.maxBasePrice}
                  onChange={e => setFilters(f => ({ ...f, maxBasePrice: Number(e.target.value) }))}
                />

                <Spacer h={10} />
                <Button variant="outline" onClick={() => setFilters({ minRating: 0, maxBasePrice: 99999, specialty: '' })} style={{ width: '100%' }}>
                  Limpiar filtros
                </Button>
              </>
            ) : null}

            <Spacer h={14} />
            <Card style={{ background: '#fafafa' }} aria-label="Mapa (placeholder)">
              <Muted>
                Mapa interactivo (placeholder). La app ya calcula distancia si hay geolocalización.
              </Muted>
            </Card>
          </Card>

          <div>
            <List aria-label="Lista de proveedores">
              {providers.map(p => {
                const fav = favorites.includes(p.id)
                return (
                  <Card key={p.id}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 800 }}>{p.name}</div>
                        <Row>
                          <Chip>{p.specialty}</Chip>
                          <Chip>⭐ {p.rating}</Chip>
                          {p.distanceKm != null ? <Chip>{formatKm(p.distanceKm)}</Chip> : null}
                        </Row>
                      </div>
                      <Button
                        variant={fav ? 'danger' : 'outline'}
                        onClick={() => onToggleFav(p.id)}
                        aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        {fav ? '♥' : '♡'}
                      </Button>
                    </Row>

                    <Spacer h={10} />
                    <Muted>{p.description || 'Sin descripción.'}</Muted>

                    <Spacer h={12} />
                    <Row>
                      <Link to={`/taquero/${p.id}`} style={{ flex: 1 }}>
                        <Button style={{ width: '100%' }}>Ver perfil</Button>
                      </Link>
                      <Link to={`/c/request/${p.id}`} style={{ flex: 1 }}>
                        <Button variant="outline" style={{ width: '100%' }}>Solicitar</Button>
                      </Link>
                    </Row>
                  </Card>
                )
              })}

              {providers.length === 0 ? (
                <Card>
                  <Muted>No hay proveedores que coincidan con tu búsqueda.</Muted>
                </Card>
              ) : null}
            </List>
          </div>
        </Two>

        <Spacer h={30} />
      </Container>
    </Page>
  )
}
