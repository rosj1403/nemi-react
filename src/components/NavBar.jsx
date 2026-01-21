import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'

const Bar = styled.nav`
  position: sticky;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #eee;
  padding: 10px 16px;
`

const Wrap = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  gap: 12px;
`

const Item = styled(Link)`
  min-height: 48px;
  min-width: 48px;
  padding: 10px 12px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: 1px solid ${p => (p.$active ? 'var(--nemi-mint)' : 'transparent')};
  background: ${p => (p.$active ? 'rgba(0,184,148,0.12)' : 'transparent')};
`

export default function NavBar() {
  const { user } = useAuth()
  const loc = useLocation()
  if (!user) return null

  const links = user.role === 'client'
    ? [
        { to: '/c/home', label: 'Buscar' },
        { to: '/c/requests', label: 'Solicitudes' },
        { to: '/c/favorites', label: 'Favoritos' },
        { to: '/account', label: 'Perfil' }
      ]
    : [
        { to: '/p/dashboard', label: 'Tablero' },
        { to: '/p/orders', label: 'Pedidos' },
        { to: '/p/business', label: 'Mis servicios' },
        { to: '/account', label: 'Perfil' }
      ]

  return (
    <Bar aria-label="Navegación principal">
      <Wrap>
        {links.map(l => (
          <Item key={l.to} to={l.to} $active={loc.pathname === l.to}>
            {l.label}
          </Item>
        ))}
      </Wrap>
    </Bar>
  )
}
