import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors, spacing, borderRadius } from '../../styles/designTokens'

const RecoverPage = styled.div`
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

const Title = styled.h1`
  font-size: 1.95rem;
  font-weight: 700;
  margin: 0 0 ${spacing.md} 0;
  color: #000;
`

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0 0 ${spacing.lg} 0;
  line-height: 1.6;
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

const BackLink = styled(Link)`
  color: ${colors.primary.menta};
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  margin-top: ${spacing.lg};
  display: block;

  &:hover {
    text-decoration: underline;
  }
`

const SuccessMessage = styled.div`
  background: rgba(0, 184, 148, 0.1);
    border: 1px solid ${colors.primary.menta};
    color: ${colors.primary.menta};
  padding: ${spacing.md};
  border-radius: 12px;
  font-size: 0.95rem;
  margin-top: ${spacing.md};
  text-align: center;
`

export default function RecoverPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <RecoverPage>
      <Logo>NEMI</Logo>

      <CardContainer>
        <Title>Recuperar Contraseña</Title>
        <Description>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer contraseña
        </Description>

        {!sent ? (
          <Form onSubmit={onSubmit}>
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
              <HelperText>Enviaremos un enlace de recuperación.</HelperText>
            </FieldGroup>

            <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
          </Form>
        ) : (
          <SuccessMessage>
            ✓ Si el correo existe, recibirás instrucciones para restablecer tu contraseña.
          </SuccessMessage>
        )}

        <BackLink to="/login">Volver a Iniciar Sesión</BackLink>
      </CardContainer>
    </RecoverPage>
  )
}
