import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Container, Page, Spacer, Title, Label, Input, Button, Subtitle } from '../../components/ui'

export default function RecoverPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    // Mock: solo muestra mensaje
    setSent(true)
  }

  return (
    <Page>
      <Container>
        <Spacer h={18} />
        <Card>
          <Title>Recuperación de contraseña</Title>
          <Subtitle>Simulación: en una app real aquí se enviaría un correo con enlace de restablecimiento.</Subtitle>

          <form onSubmit={onSubmit}>
            <Label htmlFor="email">Correo</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Spacer h={14} />
            <Button type="submit" style={{ width: '100%' }}>
              Enviar enlace
            </Button>
          </form>

          {sent ? (
            <>
              <Spacer h={12} />
              <Subtitle>Listo: si el correo existiera, recibirías instrucciones.</Subtitle>
            </>
          ) : null}

          <Spacer h={12} />
          <Link to="/login">Volver</Link>
        </Card>
      </Container>
    </Page>
  )
}
