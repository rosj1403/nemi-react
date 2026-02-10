import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ClipboardList, Heart, Home, MapPin, SlidersHorizontal, Star, User } from 'lucide-react'
import { colors, spacing, typography, borderRadius } from '../../styles/designTokens'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { useGeolocation } from '../../hooks/useGeolocation'

/**
 * Página de inicio del cliente
 * Busca y filtra proveedores de servicios
 */

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

  @media (max-width: 768px) {
    padding: ${spacing.sm} ${spacing.md};
  }
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

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: ${spacing.lg};
  position: relative;
`

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
  padding: ${spacing.md} ${spacing.lg} ${spacing.md} ${spacing.lg};
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-family: ${typography.families.body};
  transition: all 0.3s ease;

  &:focus {
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
    box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`

const FilterIcon = styled.button`
  position: absolute;
  right: ${spacing.md};
  background: #fff;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${colors.primary.menta};
  padding: ${spacing.xs};
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  background: #e0e0e0;
  position: relative;
  border-radius: 8px;
  margin: 0 ${spacing.lg} ${spacing.lg};
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 0 ${spacing.md} ${spacing.md};
    height: 250px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

const ContentArea = styled.div`
  flex: 1;
  padding: 0 ${spacing.lg} ${spacing.lg};

  @media (max-width: 768px) {
    padding: 0 ${spacing.md} 80px;
  }
`

const StatusText = styled.p`
  margin: ${spacing.sm} ${spacing.lg} 0;
  color: ${colors.text.secondary};
  font-size: 0.95rem;
`

const ProvidersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProviderCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`

const ProviderImage = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
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
`

const ProviderInfo = styled.div`
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
  background: ${colors.primary.menta};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    background: #00a87f;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
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

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xxl};
  background: white;
  border-radius: ${borderRadius.lg};
  grid-column: 1 / -1;

  h3 {
    font-size: ${typography.sizes.h3};
    color: ${colors.text.primary};
    margin: 0 0 ${spacing.md} 0;
  }

  p {
    color: ${colors.text.secondary};
    margin: 0;
  }
`

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&h=450&q=80',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&h=450&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561d1b?auto=format&fit=crop&w=800&h=450&q=80',
  'https://images.unsplash.com/photo-1585238341710-4b51926f5f90?auto=format&fit=crop&w=800&h=450&q=80'
]

export default function ClientHome() {
  const { user } = useAuth()
  const nav = useNavigate()
  const { coords, status } = useGeolocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [providers, setProviders] = useState([])
  const [favoriteIds, setFavoriteIds] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const normalizeText = (value = '') => (
    value
      .toString()
      .normalize('NFD')
      .replace(/[\u0000-\u001f]/g, '')
      .replace(/[\u007f-\u007f]/g, '')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  )

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    const handle = setTimeout(async () => {
      try {
        const location = coords?.lat != null && coords?.lng != null ? coords : null
        const [pRes, fRes] = await Promise.all([
          api.providers.list({ location }),
          api.favorites.list({ userId: user.id })
        ])
        if (!active) return
        setProviders(pRes.providers)
        setFavoriteIds(fRes.favorites)
      } catch (err) {
        if (active) {
          setProviders([])
          setFavoriteIds([])
          setError(err?.message || 'No se pudieron cargar proveedores')
        }
      } finally {
        if (active) setLoading(false)
      }
    }, 250)

    return () => {
      active = false
      clearTimeout(handle)
    }
  }, [user.id, coords])

  const toggleFavorite = async (id) => {
    const res = await api.favorites.toggle({ userId: user.id, providerId: id })
    setFavoriteIds(res.favorites)
  }

  const filteredProviders = useMemo(() => {
    const query = normalizeText(searchTerm)
    if (!query) return providers

    return providers.filter(provider => {
      const fields = [
        provider.name,
        provider.specialty,
        provider.description,
        provider.serviceArea,
        provider.address,
        ...(provider.badges || []),
        ...(provider.packages || []).map(p => p.title)
      ]
      const haystack = normalizeText(fields.filter(Boolean).join(' '))
      return haystack.includes(query)
    })
  }, [searchTerm, providers])

  return (
    <Container>
      {/* TOP BAR */}
      <TopBar>
        <Logo>NEMI</Logo>
        <UserProfile>
          <User size={18} />
        </UserProfile>
      </TopBar>

      <StatusText>
        Ubicación: {status === 'granted' ? 'permitida' : status === 'denied' ? 'denegada' : status || 'pendiente'}
      </StatusText>

      {/* SEARCH BAR */}
      <SearchContainer>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder="Buscar taqueros, servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterIcon aria-label="Filtrar">
            <SlidersHorizontal size={18} />
          </FilterIcon>
        </SearchInputWrapper>
      </SearchContainer>

      {/* MAP */}
      <MapContainer>
        <iframe
          title="Mapa de proveedores"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-99.1832%2C19.3926%2C-99.0832%2C19.4726&layer=mapnik&marker=19.4326%2C-99.1332"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </MapContainer>

      {/* CONTENT */}
      <ContentArea>
        {loading ? (
          <EmptyState>
            <h3>Cargando proveedores…</h3>
            <p>Por favor espera</p>
          </EmptyState>
        ) : error ? (
          <EmptyState>
            <h3>Hubo un problema</h3>
            <p>{error}</p>
          </EmptyState>
        ) : filteredProviders.length > 0 ? (
          <ProvidersGrid>
            {filteredProviders.map((provider, index) => (
              <ProviderCard key={provider.id}>
                <ProviderImage>
                  <img
                    src={provider.photos?.[0] || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                    alt={provider.name}
                    onError={(e) => {
                      const fallback = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
                      if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
                    }}
                  />
                  <FavoriteButton
                    onClick={() => toggleFavorite(provider.id)}
                    title={favoriteIds.includes(provider.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    <Heart
                      color={favoriteIds.includes(provider.id) ? colors.danger : '#999'}
                      fill={favoriteIds.includes(provider.id) ? colors.danger : 'none'}
                    />
                  </FavoriteButton>
                </ProviderImage>
                <ProviderInfo>
                  <ProviderName>{provider.name}</ProviderName>
                  <RatingRow>
                    <Star size={16} className="stars" />
                    <span>{provider.rating || 0}</span>
                    <span>({provider.reviews?.length || 0})</span>
                  </RatingRow>
                  <LocationRow>
                    <MapPin size={14} />
                    {provider.distanceKm != null ? `${provider.distanceKm.toFixed(1)} km` : (provider.address || 'Ubicación disponible')}
                  </LocationRow>
                  <Link to={`/taquero/${provider.id}`} style={{ textDecoration: 'none' }}>
                    <DetailsButton>Ver detalles</DetailsButton>
                  </Link>
                </ProviderInfo>
              </ProviderCard>
            ))}
          </ProvidersGrid>
        ) : (
          <EmptyState>
            <h3>No hay resultados</h3>
            <p>Intenta con otra búsqueda</p>
          </EmptyState>
        )}
      </ContentArea>

      {/* MOBILE FOOTER */}
      <MobileFooter>
        <FooterIcon $active onClick={() => nav('/home')}>
          <Home size={22} />
          <div>Inicio</div>
        </FooterIcon>
        <FooterIcon onClick={() => nav('/requests')}>
          <ClipboardList size={22} />
          <div>Solicitudes</div>
        </FooterIcon>
        <FooterIcon onClick={() => nav('/favorites')}>
          <Heart size={22} />
          <div>Favoritos</div>
        </FooterIcon>
      </MobileFooter>
    </Container>
  )
}
