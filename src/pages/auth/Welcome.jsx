import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { colors, spacing, borderRadius, typography } from '../../styles/designTokens'
import { useAuth } from '../../context/AuthContext'

const WelcomePage = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${spacing.lg} ${spacing.md};
  text-align: center;
`

const Logo = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${colors.primary.menta};
  margin-bottom: ${spacing.xl};
  letter-spacing: 2px;
  font-family: 'Poppins', sans-serif;
`

const HeadingContainer = styled.div`
  max-width: 600px;
  margin-bottom: ${spacing.xl};
`

const Heading = styled.h1`
  font-size: 2.441rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 ${spacing.md} 0;
  color: #000;

  .highlight {
    color: ${colors.primary.menta};
  }
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0 0 ${spacing.lg} 0;
  line-height: 1.6;
`

const ImageContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 200px;
  background: #FFD700;
  border-radius: 30px;
  margin: ${spacing.lg} auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ButtonContainer = styled.div`
  max-width: 400px;
  margin: ${spacing.lg} auto;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`

const StyledButton = styled(Link)`
  text-decoration: none;
  display: block;
  padding: ${spacing.md} ${spacing.lg};
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${colors.primary.menta};
  text-align: center;

  &.primary {
    background: ${colors.primary.menta};
    color: white;
    box-shadow: 0 10px 24px rgba(0, 184, 148, 0.25);

    &:hover {
      background: #00a380;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 184, 148, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &.secondary {
    background: white;
    color: ${colors.primary.menta};

    &:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 184, 148, 0.1);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`

const LoginLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
  margin-top: ${spacing.lg};
  display: inline-block;

  &:hover {
    color: ${colors.primary.menta};
  }
`

export default function Welcome() {
  const { user } = useAuth()
  const nav = useNavigate()

  React.useEffect(() => {
    if (user?.role === 'client') nav('/home', { replace: true })
    if (user?.role === 'provider') nav('/dashboard', { replace: true })
  }, [user, nav])

  return (
    <WelcomePage>
      <Logo>NEMI</Logo>

      <HeadingContainer>
        <Heading>
          Los Mejores <span className="highlight">Tacos</span> a tu Evento
        </Heading>
        <Subtitle>Te conectamos con los mejores taqueros de tu zona</Subtitle>
      </HeadingContainer>

      <ImageContainer>
        <img 
          src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=200&fit=crop" 
          alt="Tacos deliciosos"
        />
      </ImageContainer>

      <ButtonContainer>
        <StyledButton to="/login" className="primary">
          Buscar Taqueros
        </StyledButton>
        <StyledButton to="/register/provider" className="secondary">
          Soy proveedor
        </StyledButton>
      </ButtonContainer>

      <LoginLink to="/login">Ya tengo cuenta</LoginLink>
    </WelcomePage>
  )
}
