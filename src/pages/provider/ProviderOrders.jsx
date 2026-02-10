import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, FileText, Home, Store, User } from 'lucide-react'
import styled from 'styled-components'
import { api } from '../../lib/mockApi'
import { useAuth } from '../../context/AuthContext'
import { colors, spacing } from '../../styles/designTokens'

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
`

const TopBar = styled.div`
  background: #000;
  color: white;
  padding: ${spacing.md} ${spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${colors.primary.menta};
  letter-spacing: 1px;
`

const UserProfile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.primary.menta};
  font-weight: 700;
`

const Content = styled.div`
  flex: 1;
  padding: ${spacing.lg};

  @media (max-width: 768px) {
    padding: ${spacing.md};
    padding-bottom: 90px;
  }
`

const BusinessCard = styled.div`
  background: #3a3a3a;
  color: white;
  padding: ${spacing.lg};
  border-radius: 16px;
  margin-bottom: ${spacing.lg};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
`

const BusinessLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 4px;
`

const BusinessName = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 ${spacing.lg} 0;
  color: #111;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${spacing.xl} ${spacing.lg};
  background: white;
  border-radius: 16px;
  min-height: 320px;
`

const EmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.md};
  opacity: 0.6;

  svg {
    width: 48px;
    height: 48px;
  }
`

const EmptyTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: ${spacing.xs};
`

const EmptyText = styled.div`
  color: #666;
  font-size: 0.95rem;
`

const RequestCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: ${spacing.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: ${spacing.md};
`

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`

const StatusChip = styled.div`
  padding: 6px 10px;
  border-radius: 999px;
  background: #f1f1f1;
  font-size: 0.8rem;
  font-weight: 600;
`

const Muted = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-top: 6px;
`

const ActionsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
`

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-weight: 700;
  cursor: pointer;
  background: ${props => (props.$variant === 'danger' ? '#ffeded' : props.$variant === 'outline' ? 'white' : colors.primary.menta)};
  color: ${props => (props.$variant === 'danger' ? '#d63031' : props.$variant === 'outline' ? colors.primary.menta : 'white')};
  border: ${props => (props.$variant === 'outline' ? `2px solid ${colors.primary.menta}` : 'none')};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover:not(:disabled) {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-top: ${spacing.xs};
`

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
  margin-top: ${spacing.sm};
  display: block;
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
  height: 64px;
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

export default function ProviderOrders() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [requests, setRequests] = useState([])
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [rejectReasonById, setRejectReasonById] = useState({})

  async function load() {
    setLoading(true)
    try {
      const [rRes, pRes] = await Promise.all([
        api.requests.listForUser({ userId: user.id, role: 'provider' }),
        api.providers.list({})
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

  async function accept(id) {
    await api.requests.updateStatus({ requestId: id, status: 'Aceptado' })
    await load()
  }

  async function reject(id) {
    const reason = rejectReasonById[id] || 'No especificado'
    await api.requests.updateStatus({ requestId: id, status: 'Rechazado', rejectionReason: reason })
    await load()
  }

  async function complete(id) {
    await api.requests.updateStatus({ requestId: id, status: 'Completado' })
    await load()
  }

  return (
    <PageContainer>
      <TopBar>
        <Logo>NEMI</Logo>
        <UserProfile>
          <User size={18} />
        </UserProfile>
      </TopBar>

      <Content>
        <BusinessCard>
          <BusinessLabel>Mi negocio</BusinessLabel>
          <BusinessName>{provider?.name || user.name}</BusinessName>
        </BusinessCard>

        <SectionTitle>Mis solicitudes</SectionTitle>

        {loading && requests.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <ClipboardList />
            </EmptyIcon>
            <EmptyTitle>Cargando…</EmptyTitle>
            <EmptyText>Estamos preparando tus solicitudes</EmptyText>
          </EmptyState>
        ) : requests.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <ClipboardList />
            </EmptyIcon>
            <EmptyTitle>Sin Solicitudes</EmptyTitle>
            <EmptyText>No tienes solicitudes en este momento</EmptyText>
          </EmptyState>
        ) : (
          requests.map(r => (
            <RequestCard key={r.id}>
              <RequestHeader>
                <div>{r.date} {r.time}</div>
                <StatusChip>{r.status}</StatusChip>
              </RequestHeader>
              <Muted><b>Ubicación:</b> {r.address}</Muted>
              {r.notes ? <Muted><b>Notas:</b> {r.notes}</Muted> : null}

              {r.status === 'Pendiente' ? (
                <>
                  <ActionsRow>
                    <Button onClick={() => accept(r.id)} disabled={loading}>Aceptar</Button>
                    <Button $variant="danger" onClick={() => reject(r.id)} disabled={loading}>Rechazar</Button>
                  </ActionsRow>
                  <Label htmlFor={`reason_${r.id}`}>Motivo de rechazo (si aplica)</Label>
                  <Input
                    id={`reason_${r.id}`}
                    value={rejectReasonById[r.id] || ''}
                    onChange={e => setRejectReasonById(prev => ({ ...prev, [r.id]: e.target.value }))}
                    placeholder="Ej. Fuera de cobertura, fecha ocupada, etc."
                  />
                </>
              ) : null}

              {r.status === 'Aceptado' ? (
                <ActionsRow>
                  <Button $variant="outline" onClick={() => complete(r.id)} disabled={loading} style={{ gridColumn: '1 / -1' }}>
                    Marcar como completado
                  </Button>
                </ActionsRow>
              ) : null}

              {r.status === 'Rechazado' ? (
                <Muted><b>Motivo:</b> {r.rejectionReason || 'No especificado'}</Muted>
              ) : null}

              <Muted>Creada: {new Date(r.createdAt).toLocaleString()}</Muted>
            </RequestCard>
          ))
        )}
      </Content>

      <MobileFooter>
        <FooterIcon onClick={() => nav('/dashboard')}>
          <Home size={22} />
          <div>Inicio</div>
        </FooterIcon>
        <FooterIcon $active onClick={() => nav('/orders')}>
          <FileText size={22} />
          <div>Solicitudes</div>
        </FooterIcon>
        <FooterIcon onClick={() => nav('/business')}>
          <Store size={22} />
          <div>Mi Negocio</div>
        </FooterIcon>
      </MobileFooter>
    </PageContainer>
  )
}
