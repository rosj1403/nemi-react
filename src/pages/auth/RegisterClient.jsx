import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors, spacing, borderRadius } from '../../styles/designTokens'
import { useAuth } from '../../context/AuthContext'

const RegisterPage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${spacing.lg} ${spacing.md};
`

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${colors.primary.menta};
  margin-bottom: ${spacing.lg};
  text-align: center;
`

const CardContainer = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: ${spacing.lg};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  margin-bottom: ${spacing.lg};
`

const UserIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${colors.primary.menta};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`

const Title = styled.h1`
  font-size: 1.95rem;
  font-weight: 700;
  margin: 0;
  color: #000;
`

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: ${spacing.md} 0 ${spacing.lg} 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
`

const Input = styled.input`
  padding: ${spacing.md};
  border: 2px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary.menta};
    box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
  }

  &::placeholder {
    color: #bbb;
  }
`

const HelperText = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0;
`

const SubmitButton = styled.button`
  padding: ${spacing.md} ${spacing.lg};
  background: ${colors.primary.menta};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${spacing.md};

  &:hover:not(:disabled) {
    background: #00a380;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 184, 148, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorText = styled.p`
  color: ${colors.danger};
  font-size: 0.9rem;
  margin: ${spacing.sm} 0 0 0;
  text-align: center;
`

const FooterLink = styled.p`
  text-align: center;
  font-size: 0.95rem;
  margin-top: ${spacing.lg};
  color: #333;

  a {
    color: ${colors.primary.menta};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default function RegisterClient() {
  const nav = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      await register({ role: 'client', name, email, password })
      nav('/home', { replace: true })
    } catch (err) {
      setError(err?.message || 'No se pudo registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegisterPage>
      <Logo>NEMI</Logo>

      <CardContainer>
        <HeaderContainer>
          <UserIcon>👤</UserIcon>
          <Title>Registro Cliente</Title>
        </HeaderContainer>

        <Subtitle>Crea tu cuenta para buscar taqueros</Subtitle>

        <Form onSubmit={onSubmit} aria-label="Formulario de registro de cliente">
          <FieldGroup>
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <HelperText>Se usa para coordinar tu servicio.</HelperText>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <HelperText>Usa al menos 6 caracteres.</HelperText>
          </FieldGroup>

          <FieldGroup>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </FieldGroup>

          {error && <ErrorText role="alert">{error}</ErrorText>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creando…' : 'Crear Cuenta'}
          </SubmitButton>
        </Form>

        <FooterLink>
          ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
        </FooterLink>
      </CardContainer>
    </RegisterPage>
  )
}
