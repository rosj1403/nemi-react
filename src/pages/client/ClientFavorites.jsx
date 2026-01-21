import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { Card, Container, Page, Spacer, Title, Row, Chip, Muted, Button } from '../../components/ui'

export default function ClientFavorites() {
  const { user } = useAuth()
  const [providers, setProviders] = useState([])
  const [favIds, setFavIds] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await api.favorites.list({ userId: user.id })
      setProviders(res.providers)
      setFavIds(res.favorites)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  async function onToggle(providerId) {
    const res = await api.favorites.toggle({ userId: user.id, providerId })
    setFavIds(res.favorites)
    // recarga lista
    const res2 = await api.favorites.list({ userId: user.id })
    setProviders(res2.providers)
  }

  return (
    <Page>
      <Container>
        <Spacer h={10} />
        <Title>Favoritos</Title>
        <Spacer h={10} />

        <Button variant="outline" onClick={load} disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Actualizando…' : 'Actualizar'}
        </Button>
        <Spacer h={10} />

        {providers.map(p => (
          <Card key={p.id}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800 }}>{p.name}</div>
                <Row>
                  <Chip>{p.specialty}</Chip>
                  <Chip>⭐ {p.rating}</Chip>
                </Row>
              </div>
              <Button variant="danger" onClick={() => onToggle(p.id)} aria-label="Quitar de favoritos">♥</Button>
            </Row>
            <Spacer h={10} />
            <Row>
              <Link to={`/taquero/${p.id}`} style={{ flex: 1 }}>
                <Button style={{ width: '100%' }}>Ver perfil</Button>
              </Link>
              <Link to={`/c/request/${p.id}`} style={{ flex: 1 }}>
                <Button variant="outline" style={{ width: '100%' }}>Solicitar</Button>
              </Link>
            </Row>
          </Card>
        ))}

        {favIds.length === 0 ? (
          <Card><Muted>Aún no guardas proveedores.</Muted></Card>
        ) : null}

        <Spacer h={30} />
      </Container>
    </Page>
  )
}
