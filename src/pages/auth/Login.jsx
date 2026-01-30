import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonPrimary } from '../../components/buttons/ButtonPrimary'
import { useAuth } from '../../context/AuthContext'
import { colors, spacing, typography, borderRadius, shadows, transitions } from '../../styles/designTokens'

const Page = styled.div`
  min-height: 100vh;
  background: ${colors.background.light};
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  padding: ${spacing.xl} ${spacing.contentPaddingMobile};
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${colors.background.default};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.lg};
  padding: ${spacing.xl};
`;

const Brand = styled.div`
  font-family: ${typography.families.display};
  font-size: ${typography.sizes.h3};
  color: ${colors.primary.menta};
  font-weight: ${typography.weights.bold};
  margin-bottom: ${spacing.sm};
`;

const Title = styled.h1`
  font-family: ${typography.families.display};
  font-size: ${typography.sizes.h2};
  line-height: ${typography.lineHeights.h2};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.sm} 0;
`;

const Subtitle = styled.p`
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.body2};
  color: ${colors.text.secondary};
  margin: 0 0 ${spacing.lg} 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const Label = styled.label`
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.text.secondary};
  font-weight: ${typography.weights.semibold};
`;

const Input = styled.input`
  width: 100%;
  min-height: 48px;
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${props => (props.$hasError ? colors.secondary.red : colors.border)};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.body2};
  color: ${colors.text.primary};
  background: ${colors.background.default};
  transition: ${transitions.normal};

  &:focus {
    outline: none;
    border-color: ${colors.primary.menta};
    box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.15);
  }

  &::placeholder {
    color: ${colors.text.disabled};
  }
`;

const PasswordRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${spacing.sm};
  align-items: center;
`;

const ToggleButton = styled.button`
  border: 1px solid ${colors.border};
  background: ${colors.background.default};
  color: ${colors.text.secondary};
  border-radius: ${borderRadius.md};
  padding: ${spacing.sm} ${spacing.md};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover {
    color: ${colors.text.primary};
    border-color: ${colors.primary.menta};
  }
`;

const HelperText = styled.span`
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.text.secondary};
`;

const FieldError = styled.span`
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.secondary.red};
  font-weight: ${typography.weights.semibold};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.text.secondary};
  cursor: pointer;

  input {
    cursor: pointer;
  }
`;

const LinkButton = styled(Link)`
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.primary.menta};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const GlobalError = styled.div`
  background: rgba(214, 48, 49, 0.08);
  border: 1px solid rgba(214, 48, 49, 0.2);
  color: ${colors.secondary.red};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  padding: ${spacing.sm} ${spacing.md};
  border-radius: ${borderRadius.md};
`;

const Divider = styled.div`
  height: 1px;
  background: ${colors.border};
  margin: ${spacing.lg} 0 ${spacing.md};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing.sm};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.text.secondary};
`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const nav = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [touched, setTouched] = useState({ email: false, password: false })
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' })

  const validateEmail = value => {
    if (!value) return 'El correo es obligatorio'
    if (!EMAIL_REGEX.test(value)) return 'Ingresa un correo válido'
    return ''
  }

  const validatePassword = value => {
    if (!value) return 'La contraseña es obligatoria'
    if (value.length < 6) return 'Debe tener al menos 6 caracteres'
    return ''
  }

  const handleEmailChange = e => {
    const value = e.target.value
    setEmail(value)
    setError('')
    if (touched.email) {
      setFieldErrors(prev => ({ ...prev, email: validateEmail(value) }))
    }
  }

  const handlePasswordChange = e => {
    const value = e.target.value
    setPassword(value)
    setError('')
    if (touched.password) {
      setFieldErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setFieldErrors(prev => ({
      ...prev,
      [field]: field === 'email' ? validateEmail(email) : validatePassword(password),
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    setFieldErrors({ email: emailError, password: passwordError })
    setTouched({ email: true, password: true })
    if (emailError || passwordError) return

    setError('')
    setLoading(true)
    try {
      if (rememberMe) {
        localStorage.setItem('nemiRememberMe', 'true')
      } else {
        localStorage.removeItem('nemiRememberMe')
      }
      const { user } = await login({ email, password })
      nav(user.role === 'client' ? '/c/home' : '/p/dashboard', { replace: true })
    } catch (err) {
      setError(err?.message || 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <Container>
        <Card>
          <Brand>🍔 Nemi</Brand>
          <Title>Iniciar sesión</Title>
          <Subtitle>Accede para gestionar tus pedidos y servicios.</Subtitle>

          <Form onSubmit={onSubmit} aria-label="Formulario de inicio de sesión">
            <Field>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@email.com"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
                $hasError={touched.email && !!fieldErrors.email}
                required
              />
              {touched.email && fieldErrors.email ? (
                <FieldError role="alert">{fieldErrors.email}</FieldError>
              ) : null}
            </Field>

            <Field>
              <Label htmlFor="password">Contraseña</Label>
              <PasswordRow>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  $hasError={touched.password && !!fieldErrors.password}
                  required
                />
                <ToggleButton type="button" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </ToggleButton>
              </PasswordRow>
              <HelperText>Mínimo 6 caracteres.</HelperText>
              {touched.password && fieldErrors.password ? (
                <FieldError role="alert">{fieldErrors.password}</FieldError>
              ) : null}
            </Field>

            <Row>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                Recuérdame
              </CheckboxLabel>
              <LinkButton to="/recover">¿Olvidaste tu contraseña?</LinkButton>
            </Row>

            {error ? <GlobalError role="alert">{error}</GlobalError> : null}

            <ButtonPrimary type="submit" fullWidth disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </ButtonPrimary>
          </Form>

          <Divider />
          <FooterLinks>
            <span>¿No tienes cuenta?</span>
            <LinkButton to="/register/client">Registro Cliente</LinkButton>
            <span>·</span>
            <LinkButton to="/register/provider">Registro Proveedor</LinkButton>
          </FooterLinks>
        </Card>
      </Container>
    </Page>
  )
}
