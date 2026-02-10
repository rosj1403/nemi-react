import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipboardList, Heart, Home, MapPin, Star, User } from 'lucide-react'
import styled from 'styled-components'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { colors, spacing } from '../../styles/designTokens'

const Container = styled.div`
  min-height: 100vh;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  background: white;
  padding: ${spacing.md} ${spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${colors.primary.menta};
`

const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.primary.menta};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`

const ContentArea = styled.div`
  flex: 1;
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};

  @media (max-width: 768px) {
    padding: ${spacing.md};
    padding-bottom: 80px;
  }
`

const FavoriteCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 500px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: #ddd;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const FavoriteButton = styled.button`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`

const CardContent = styled.div`
  padding: ${spacing.md};
`

const ProviderName = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 ${spacing.xs} 0;
  color: #000;
`

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.sm};
  font-size: 0.9rem;
  color: #666;

  .stars {
    color: #ffc107;
    font-weight: 600;
  }
`

const LocationRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  font-size: 0.85rem;
  color: #666;
  margin-bottom: ${spacing.md};
`

const DetailsButton = styled.button`
  width: 100%;
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.danger};
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    background: #c41e1e;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`

const EmptyState = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
  flex: 1;
  justify-content: center;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;

  svg {
    width: 64px;
    height: 64px;
  }
`

const Title = styled.h1`
  font-size: 1.95rem;
  font-weight: 700;
  margin: 0;
  color: #000;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.6;
`

/* Mobile Footer Navigation */
const MobileFooter = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  z-index: 100;

  @media (min-width: 769px) {
    display: none;
  }
`

const FooterIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: ${spacing.sm};
  color: ${props => (props.$active ? colors.primary.menta : '#555')};
  background: ${props => (props.$active ? 'rgba(0, 184, 148, 0.12)' : 'transparent')};
  border-radius: 12px;
  transition: color 0.2s ease;
  font-size: 0.8rem;
  font-weight: ${props => (props.$active ? 700 : 600)};

  svg {
    font-size: 1.5rem;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`

export default function ClientFavorites() {
  const { user } = useAuth()
  const nav = useNavigate()
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

  useEffect(() => {
    load()
  }, []) // eslint-disable-line

  async function onToggle(providerId) {
    const res = await api.favorites.toggle({ userId: user.id, providerId })
    setFavIds(res.favorites)
    const res2 = await api.favorites.list({ userId: user.id })
    setProviders(res2.providers)
  }

  return (
    <Container>
      {/* TOP BAR */}
      <TopBar>
        <Logo>NEMI</Logo>
        <UserProfile>
          <User size={18} />
        </UserProfile>
      </TopBar>

      {/* CONTENT */}
      <ContentArea>
        {loading ? (
          <EmptyState>
            <Icon>
              <Heart />
            </Icon>
            <Title>Cargando…</Title>
            <Subtitle>Estamos preparando tus favoritos</Subtitle>
          </EmptyState>
        ) : providers.length === 0 ? (
          <EmptyState>
            <Icon>
              <Heart />
            </Icon>
            <Title>Favoritos</Title>
            <Subtitle>Aquí guardas tus proveedores favoritos</Subtitle>
          </EmptyState>
        ) : (
          providers.map(p => (
            <FavoriteCard key={p.id}>
              <CardImage>
                <img src={p.image} alt={p.name} />
                <FavoriteButton
                  onClick={() => onToggle(p.id)}
                  title="Quitar de favoritos"
                >
                  <Heart color={colors.danger} fill={colors.danger} />
                </FavoriteButton>
              </CardImage>
              <CardContent>
                <ProviderName>{p.name}</ProviderName>
                <RatingRow>
                  <Star size={16} className="stars" />
                  <span>{p.rating}</span>
                  <span>({p.reviewCount})</span>
                </RatingRow>
                <LocationRow>
                  <MapPin size={14} />
                  {p.distance ? `${p.distance} km` : 'Ubicación disponible'}
                </LocationRow>
                <Link to={`/taquero/${p.id}`} style={{ textDecoration: 'none' }}>
                  <DetailsButton>Ver detalles</DetailsButton>
                </Link>
              </CardContent>
            </FavoriteCard>
          ))
        )}
      </ContentArea>

      {/* MOBILE FOOTER */}
      <MobileFooter>
        <FooterIcon onClick={() => nav('/home')}>
          <Home size={22} />
          <div>Inicio</div>
        </FooterIcon>
        <FooterIcon onClick={() => nav('/requests')}>
          <ClipboardList size={22} />
          <div>Solicitudes</div>
        </FooterIcon>
        <FooterIcon $active onClick={() => nav('/favorites')}>
          <Heart size={22} />
          <div>Favoritos</div>
        </FooterIcon>
      </MobileFooter>
    </Container>
  )
}
