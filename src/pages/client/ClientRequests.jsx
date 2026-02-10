import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, Heart, Home, User } from 'lucide-react'
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl};
`

const EmptyState = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
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

const RequestCard = styled.div`
  background: white;
  padding: ${spacing.lg};
  border-radius: 12px;
  margin-bottom: ${spacing.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const RequestsContainer = styled.div`
  max-width: 600px;
  width: 100%;
  padding-bottom: 80px;

  @media (min-width: 769px) {
    padding-bottom: ${spacing.lg};
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

export default function ClientRequests() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await api.requests.listForUser({ userId: user.id, role: 'client' })
      setRequests(res.requests)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, []) // eslint-disable-line

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
              <ClipboardList />
            </Icon>
            <Title>Cargando…</Title>
            <Subtitle>Estamos preparando tus solicitudes</Subtitle>
          </EmptyState>
        ) : requests.length === 0 ? (
          <EmptyState>
            <Icon>
              <ClipboardList />
            </Icon>
            <Title>Mis solicitudes</Title>
            <Subtitle>Aquí verás el historial de tus solicitudes</Subtitle>
          </EmptyState>
        ) : (
          <RequestsContainer>
            {requests.map(r => (
              <RequestCard key={r.id}>
                <div style={{ fontWeight: 800, marginBottom: '8px' }}>
                  {r.providerName}
                </div>
                <div style={{ fontSize: '0.85rem', color: colors.primary.menta, marginBottom: '8px' }}>
                  {r.status}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>
                  <b>Fecha:</b> {r.date} · <b>Hora:</b> {r.time}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>
                  <b>Ubicación:</b> {r.address}
                </div>
                {r.notes && (
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>
                    <b>Notas:</b> {r.notes}
                  </div>
                )}
                {r.status === 'Rechazado' && r.rejectionReason && (
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    <b>Motivo:</b> {r.rejectionReason}
                  </div>
                )}
                <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '8px' }}>
                  Creada: {new Date(r.createdAt).toLocaleString()}
                </div>
              </RequestCard>
            ))}
          </RequestsContainer>
        )}
      </ContentArea>

      {/* MOBILE FOOTER */}
      <MobileFooter>
        <FooterIcon onClick={() => nav('/home')}>
          <Home size={22} />
          <div>Inicio</div>
        </FooterIcon>
        <FooterIcon $active onClick={() => nav('/requests')}>
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
