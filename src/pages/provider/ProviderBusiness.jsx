import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Home, Store, User } from 'lucide-react'
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
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 ${spacing.md} 0;
  color: #111;
`

const FormCard = styled.div`
  background: transparent;
  border-radius: 16px;
  padding: 0;
  box-shadow: none;
`

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #444;
  margin-top: ${spacing.md};
  display: block;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 18px;
  border: 1px solid #cfcfcf;
  margin-top: ${spacing.xs};
  height: 46px;
  outline: none;
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 18px;
  border: 1px solid #cfcfcf;
  margin-top: ${spacing.xs};
  min-height: 70px;
  resize: vertical;
  outline: none;
`

const Muted = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-top: 6px;
`

const ErrorText = styled.div`
  color: #d63031;
  font-size: 0.9rem;
  margin-top: ${spacing.sm};
`

const PrimaryButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
  background: ${colors.primary.menta};
  color: white;
  margin-top: ${spacing.lg};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover:not(:disabled) {
    background: #00a87f;
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

export default function ProviderBusiness() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const res = await api.providers.list({})
      const owned = res.providers.find(p => p.ownerUserId === user.id)
      setProvider(owned || null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  async function save() {
    if (!provider) return
    setError('')
    setSaving(true)
    try {
      const res = await api.providers.updateByOwner({
        ownerUserId: user.id,
        patch: {
          name: provider.name,
          phone: provider.phone || '',
          address: provider.address || '',
          description: provider.description || '',
          specialty: provider.specialty,
          basePrice: Number(provider.basePrice) || 0,
          coverRadiusKm: Number(provider.coverRadiusKm) || 0
        }
      })
      setProvider(res.provider)
    } catch (err) {
      setError(err?.message || 'No se pudo guardar')
    } finally {
      setSaving(false)
    }
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

        <SectionTitle>Mi negocio</SectionTitle>

        {loading ? (
          <FormCard>
            <Muted>Cargando información del negocio…</Muted>
          </FormCard>
        ) : !provider ? (
          <FormCard>
            <Muted>No se encontró un perfil de proveedor asociado a este usuario.</Muted>
          </FormCard>
        ) : (
          <FormCard>
            <Label htmlFor="name">Nombre del Negocio</Label>
            <Input id="name" value={provider.name} onChange={e => setProvider(p => ({ ...p, name: e.target.value }))} />

            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" value={provider.phone || ''} onChange={e => setProvider(p => ({ ...p, phone: e.target.value }))} />

            <Label htmlFor="address">Dirección</Label>
            <Input id="address" value={provider.address || ''} onChange={e => setProvider(p => ({ ...p, address: e.target.value }))} />

            <Label htmlFor="desc">Descripción</Label>
            <Textarea id="desc" value={provider.description || ''} onChange={e => setProvider(p => ({ ...p, description: e.target.value }))} />

            <PrimaryButton onClick={save} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar Cambios'}
            </PrimaryButton>
            {error ? <ErrorText role="alert">{error}</ErrorText> : null}
          </FormCard>
        )}
      </Content>

      <MobileFooter>
        <FooterIcon onClick={() => nav('/dashboard')}>
          <Home size={22} />
          <div>Inicio</div>
        </FooterIcon>
        <FooterIcon onClick={() => nav('/orders')}>
          <FileText size={22} />
          <div>Solicitudes</div>
        </FooterIcon>
        <FooterIcon $active onClick={() => nav('/business')}>
          <Store size={22} />
          <div>Mi Negocio</div>
        </FooterIcon>
      </MobileFooter>
    </PageContainer>
  )
}
