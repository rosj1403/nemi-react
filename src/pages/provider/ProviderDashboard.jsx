import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ClipboardList, Clock, DollarSign, Home, Store, Star, User } from 'lucide-react'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import styled from 'styled-components'
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

  @media (max-width: 768px) {
    padding: ${spacing.md};
    padding-bottom: 80px;
  }
`

const BusinessCard = styled.div`
  background: #2d2d2d;
  color: white;
  padding: ${spacing.lg};
  border-radius: 12px;
  margin-bottom: ${spacing.lg};
  font-size: 1.1rem;
  font-weight: 600;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.lg};
  margin-bottom: ${spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const StatCard = styled.div`
  background: ${props => props.$color || '#fff'};
  padding: ${spacing.lg};
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.md};

  svg {
    width: 28px;
    height: 28px;
  }
`

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: ${spacing.xs};
  color: #000;
`

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #333;
  font-weight: 600;
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 ${spacing.md} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${colors.primary.menta};
    font-size: 0.9rem;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xl};
  background: white;
  border-radius: 12px;
`

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  margin-bottom: ${spacing.md};

  svg {
    width: 48px;
    height: 48px;
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

export default function ProviderDashboard() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [provider, setProvider] = useState(null)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const [pRes, rRes] = await Promise.all([
        api.providers.list({}),
        api.requests.listForUser({ userId: user.id, role: 'provider' })
      ])
      const owned = pRes.providers.find(p => p.ownerUserId === user.id)
      setProvider(owned || null)
      setRequests(rRes.requests)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, []) // eslint-disable-line

  const stats = useMemo(() => {
    const pending = requests.filter(r => r.status === 'Pendiente').length
    const accepted = requests.filter(r => r.status === 'Aceptado').length
    const completed = requests.filter(r => r.status === 'Completado').length
    const revenue = requests.filter(r => r.status === 'Completado').length * 500 // Mock: $500 por solicitud
    return { pending, accepted, completed, revenue }
  }, [requests])

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
            <EmptyIcon>
              <ClipboardList />
            </EmptyIcon>
            <div>Cargando tablero…</div>
          </EmptyState>
        ) : (
          <>
            {/* BUSINESS NAME */}
            <BusinessCard>
              {provider?.name || user.name}
            </BusinessCard>

            {/* STATS GRID */}
            <StatsGrid>
              <StatCard $color="rgba(173, 216, 230, 0.5)">
                <StatIcon>
                  <Clock />
                </StatIcon>
                <StatNumber>{stats.pending}</StatNumber>
                <StatLabel>Pendientes</StatLabel>
              </StatCard>

              <StatCard $color="rgba(144, 238, 144, 0.5)">
                <StatIcon>
                  <Check />
                </StatIcon>
                <StatNumber>{stats.accepted}</StatNumber>
                <StatLabel>Aceptadas</StatLabel>
              </StatCard>

              <StatCard $color="rgba(175, 238, 238, 0.5)">
                <StatIcon>
                  <Star />
                </StatIcon>
                <StatNumber>{stats.completed}</StatNumber>
                <StatLabel>Completadas</StatLabel>
              </StatCard>

              <StatCard $color="rgba(255, 255, 153, 0.5)">
                <StatIcon>
                  <DollarSign />
                </StatIcon>
                <StatNumber>{stats.revenue}</StatNumber>
                <StatLabel>Ingresos</StatLabel>
              </StatCard>
            </StatsGrid>

            {/* RECENT REQUESTS */}
            <SectionTitle>
              Solicitudes Recientes
              <a href="/orders">Ver todas</a>
            </SectionTitle>

            {requests.length === 0 ? (
              <EmptyState>
                <EmptyIcon>
                  <ClipboardList />
                </EmptyIcon>
                <div>No hay solicitudes</div>
              </EmptyState>
            ) : (
              requests.slice(0, 3).map(r => (
                <div
                  key={r.id}
                  style={{
                    background: 'white',
                    padding: spacing.lg,
                    borderRadius: '12px',
                    marginBottom: spacing.md,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: spacing.xs }}>
                    {r.providerName}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: spacing.sm }}>
                    <b>Fecha:</b> {r.date} · <b>Hora:</b> {r.time}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <b>Ubicación:</b> {r.address}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </ContentArea>

      {/* MOBILE FOOTER */}
      <MobileFooter>
        <FooterIcon $active onClick={() => nav('/dashboard')}>
          <Home size={22} />
          <div>Inicio</div>
        </FooterIcon>
        <FooterIcon onClick={() => nav('/business')}>
          <Store size={22} />
          <div>Mi Negocio</div>
        </FooterIcon>
      </MobileFooter>
    </Container>
  )
}
