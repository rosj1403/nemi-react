import styled from 'styled-components'
import { useMemo, useState } from 'react'
import { ClipboardList, Heart, Home, MapPin, SlidersHorizontal, Star, User } from 'lucide-react'
import { colors, spacing, typography, borderRadius } from '../../styles/designTokens'

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
  color: ${colors.primary};
`

const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.primary};
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
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`

const FilterIcon = styled.button`
  position: absolute;
  right: ${spacing.md};
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${colors.primary};
  padding: ${spacing.xs};
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
  padding: ${spacing.xs};
  color: ${props => (props.$active ? colors.primary : '#999')};
  transition: color 0.2s ease;
  font-size: 0.7rem;

  svg {
    font-size: 1.5rem;
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

// Mock data - Proveedores
const MOCK_PROVIDERS = [
  {
    id: 1,
    name: 'Tacos Piña',
    specialty: 'Tacos variados',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561d1b?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    distance: 0.5,
    location: 'Perif. Paseo de la República, 7166',
    category: 'taquerias',
    minPrice: 200,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Parrillada La Mexicana',
    specialty: 'Carne asada',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=225&fit=crop',
    rating: 4.5,
    reviewCount: 28,
    distance: 3.8,
    location: 'Av. Paseo de la República',
    category: 'parrilladas',
    minPrice: 300,
    isFavorite: false
  },
  {
    id: 3,
    name: 'Taquería Express',
    specialty: 'Tacos de canasta',
    image: 'https://images.unsplash.com/photo-1585238341710-4b51926f5f90?w=400&h=225&fit=crop',
    rating: 4.3,
    reviewCount: 15,
    distance: 1.2,
    location: 'Centro Histórico',
    category: 'taquerias',
    minPrice: 150,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Barbacoa Tradicional',
    specialty: 'Barbacoa de res',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=225&fit=crop',
    rating: 4.7,
    reviewCount: 35,
    distance: 4.2,
    location: 'Zona Sur',
    category: 'barbacoa',
    minPrice: 250,
    isFavorite: false
  },
  {
    id: 5,
    name: 'Quesadillas Casa María',
    specialty: 'Quesadillas rellenas',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b5?w=400&h=225&fit=crop',
    rating: 4.4,
    reviewCount: 22,
    distance: 2.1,
    location: 'Polanco',
    category: 'quesadillas',
    minPrice: 120,
    isFavorite: false
  },
  {
    id: 6,
    name: 'Carnitas El Jefe',
    specialty: 'Carnitas de cerdo',
    image: 'https://images.unsplash.com/photo-1618449049551-1e7d6e49fd26?w=400&h=225&fit=crop',
    rating: 4.9,
    reviewCount: 58,
    distance: 1.8,
    location: 'Benito Juárez',
    category: 'carnitas',
    minPrice: 180,
    isFavorite: false
  }
]

export default function ClientHome() {
  const [searchTerm, setSearchTerm] = useState('')
  const [providers, setProviders] = useState(MOCK_PROVIDERS)
  const [activeTab, setActiveTab] = useState('home')

  const toggleFavorite = (id) => {
    setProviders(prev =>
      prev.map(p => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    )
  }

  const filteredProviders = useMemo(() => {
    return providers.filter(
      provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3024.2219901290355!2d-74.00601!3d40.71128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sunion%20station!5e0!3m2!1ses!2s!4v1234567890"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </MapContainer>

      {/* CONTENT */}
      <ContentArea>
        {filteredProviders.length > 0 ? (
          <ProvidersGrid>
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id}>
                <ProviderImage>
                  <img src={provider.image} alt={provider.name} />
                  <FavoriteButton
                    onClick={() => toggleFavorite(provider.id)}
                    title={provider.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  >
                    <Heart
                      color={provider.isFavorite ? colors.danger : '#999'}
                      fill={provider.isFavorite ? colors.danger : 'none'}
                    />
                  </FavoriteButton>
                </ProviderImage>
                <ProviderInfo>
                  <ProviderName>{provider.name}</ProviderName>
                  <RatingRow>
                    <Star size={16} className="stars" />
                    <span>{provider.rating}</span>
                    <span>({provider.reviewCount})</span>
                  </RatingRow>
                  <LocationRow>
                    <MapPin size={14} />
                    {provider.location}
                  </LocationRow>
                  <DetailsButton onClick={() => console.log(`Ver detalles de ${provider.name}`)}>
                    Ver detalles
                  </DetailsButton>
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
        <FooterIcon $active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
          <Home size={22} />
          <div>Inicio</div>
        </FooterIcon>
        <FooterIcon $active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
          <ClipboardList size={22} />
          <div>Solicitudes</div>
        </FooterIcon>
        <FooterIcon $active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')}>
          <Heart size={22} />
          <div>Favoritos</div>
        </FooterIcon>
      </MobileFooter>
    </Container>
  )
}import React, { useEffect, useMemo, useState } from 'react'
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
