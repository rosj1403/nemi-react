import styled from 'styled-components';
import { ServiceCard } from '../components/cards/ServiceCard';
import { RequestStatus } from '../components/badges/RequestStatus';
import { ButtonPrimary } from '../components/buttons/ButtonPrimary';
import { colors, spacing, typography, transitions, borderRadius } from '../styles/designTokens';

/**
 * Página de Demostración de Componentes
 * Muestra todos los componentes del sistema de diseño en acción
 * Sigue 100% el documento de especificaciones de Nemi
 */

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.background.light};
  padding: ${spacing.lg} ${spacing.md};

  @media (max-width: 600px) {
    padding: ${spacing.md};
  }
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto ${spacing.xxl};
  text-align: center;
  
  h1 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h1};
    font-weight: ${typography.weights.bold};
    color: ${colors.primary.menta};
    margin: 0 0 ${spacing.md} 0;
    letter-spacing: ${typography.letterSpacing.h1};
  }
  
  p {
    font-family: ${typography.families.body};
    font-size: ${typography.sizes.body1};
    color: ${colors.text.secondary};
    margin: 0;
    line-height: ${typography.lineHeights.body1};
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto ${spacing.xxl};
  
  h2 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h2};
    font-weight: ${typography.weights.semibold};
    color: ${colors.text.primary};
    margin: 0 0 ${spacing.lg} 0;
    padding-bottom: ${spacing.md};
    border-bottom: 3px solid ${colors.primary.menta};
    letter-spacing: ${typography.letterSpacing.h2};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing.lg};
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: ${spacing.md};
  }
`;

const DemoBox = styled.div`
  background: white;
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.border};
  box-shadow: ${spacing.xs} ${spacing.xs} ${spacing.md} rgba(0, 0, 0, 0.05);
  transition: ${transitions.normal};

  &:hover {
    box-shadow: 0 ${spacing.md} ${spacing.lg} rgba(0, 0, 0, 0.1);
  }
`;

const Label = styled.label`
  display: block;
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.md};
  text-transform: uppercase;
  font-weight: ${typography.weights.semibold};
  letter-spacing: 0.5px;
`;

const DemoItem = styled.div`
  margin-bottom: ${spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Divider = styled.hr`
  margin: ${spacing.lg} 0;
  border: none;
  border-top: 1px solid ${colors.border};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const StatusGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${spacing.md};
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ColorBox = styled.div`
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  text-align: center;
  color: white;
  font-family: ${typography.families.body};
  font-weight: ${typography.weights.bold};
  font-size: ${typography.sizes.body2};
  
  p {
    margin: ${spacing.sm} 0 0 0;
    font-size: ${typography.sizes.caption};
    opacity: 0.9;
  }
`;

const TypographyExample = styled.div`
  margin: ${spacing.lg} 0;
  
  & > div {
    margin-bottom: ${spacing.md};
  }
`;

const NavBar = styled.nav`
  background: white;
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 1px solid ${colors.border};
  margin-bottom: ${spacing.xl};
  display: flex;
  align-items: center;
  gap: ${spacing.lg};
  
  a {
    color: ${colors.text.primary};
    text-decoration: none;
    font-family: ${typography.families.body};
    font-weight: ${typography.weights.semibold};
    transition: ${transitions.normal};
    
    &:hover {
      color: ${colors.primary.menta};
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${spacing.xxl} ${spacing.lg};
  color: ${colors.text.secondary};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  border-top: 1px solid ${colors.border};
  margin-top: ${spacing.xxl};
  background: white;
`;

export const ComponentShowcase = () => {
  const handleServiceCardClick = (name) => {
    console.log('Clicked on:', name);
  };

  const handleFavorite = (name) => {
    console.log('Favorited:', name);
  };

  return (
    <>
      <NavBar>
        <strong style={{ color: colors.primary.menta, fontSize: '20px' }}>🍔 Nemi</strong>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: colors.text.secondary }}>
          Sistema de Diseño v1.0
        </span>
      </NavBar>

      <Container>
        <Header>
          <h1>Sistema de Diseño Nemi</h1>
          <p>Documentación de componentes, tipografía, colores y espaciado</p>
        </Header>

        {/* BOTONES */}
        <Section>
          <h2>1. Botones del Sistema</h2>
          <DemoBox>
            <ButtonGroup>
              <DemoItem>
                <Label>Variante Primary - Verde Menta</Label>
                <ButtonPrimary variant="primary" fullWidth>
                  Solicitar Servicio
                </ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Variante Danger - Rojo</Label>
                <ButtonPrimary variant="danger" fullWidth>
                  Rechazar Solicitud
                </ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Variante Secondary - Gris</Label>
                <ButtonPrimary variant="secondary" fullWidth>
                  Cancelar
                </ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Estado Deshabilitado</Label>
                <ButtonPrimary disabled fullWidth>
                  No disponible
                </ButtonPrimary>
              </DemoItem>
              <Divider />
              <DemoItem>
                <Label>Tamaño Small</Label>
                <ButtonPrimary size="small">Botón pequeño</ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Tamaño Medium (por defecto)</Label>
                <ButtonPrimary size="medium" fullWidth>Botón mediano</ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Tamaño Large</Label>
                <ButtonPrimary size="large" fullWidth>Botón grande</ButtonPrimary>
              </DemoItem>
            </ButtonGroup>
          </DemoBox>
        </Section>

        {/* TARJETAS DE SERVICIO */}
        <Section>
          <h2>2. Tarjetas de Servicio</h2>
          <p style={{ fontFamily: typography.families.body, color: colors.text.secondary, marginBottom: spacing.lg }}>
            Componente principal para mostrar proveedores con información detallada: imagen, nombre, especialidad, rating, distancia y precio.
          </p>
          <Grid>
            <ServiceCard
              image="https://images.unsplash.com/photo-1555939594-58d7cb561d1b?w=400&h=225&fit=crop"
              name="Taquería Don Carlos"
              specialty="Tacos al pastor"
              rating={4.8}
              reviewCount={42}
              distance="2.5 km"
              priceRange="$200-400"
              badge="Verificado"
              onClick={() => handleServiceCardClick('Don Carlos')}
              onFavorite={handleFavorite}
            />
            <ServiceCard
              image="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=225&fit=crop"
              name="Parrillada La Mexicana"
              specialty="Carne asada"
              rating={4.5}
              reviewCount={28}
              distance="3.8 km"
              priceRange="$300-500"
              badge="Popular"
              onClick={() => handleServiceCardClick('La Mexicana')}
              onFavorite={handleFavorite}
              isFavorite={true}
            />
            <ServiceCard
              image="https://images.unsplash.com/photo-1585238341710-4b51926f5f90?w=400&h=225&fit=crop"
              name="Taquería Express"
              specialty="Tacos de canasta"
              rating={4.3}
              reviewCount={15}
              distance="1.2 km"
              priceRange="$150-250"
              onClick={() => handleServiceCardClick('Express')}
              onFavorite={handleFavorite}
            />
            <ServiceCard
              name="Sin imagen (placeholder)"
              specialty="Tacos de canasta"
              rating={5.0}
              reviewCount={5}
              distance="0.5 km"
              priceRange="$180-280"
              onClick={() => handleServiceCardClick('Sin imagen')}
              onFavorite={handleFavorite}
            />
          </Grid>
        </Section>

        {/* ESTADOS DE SOLICITUD */}
        <Section>
          <h2>3. Estados de Solicitud</h2>
          <p style={{ fontFamily: typography.families.body, color: colors.text.secondary, marginBottom: spacing.lg }}>
            Badges semánticos para indicar el estado de las solicitudes de servicio. Incluyen icono y color distintivo.
          </p>
          <DemoBox>
            <StatusGrid>
              <DemoItem>
                <Label>Estado: Pendiente</Label>
                <RequestStatus status="pending" size="medium" />
              </DemoItem>
              <DemoItem>
                <Label>Estado: Aceptada</Label>
                <RequestStatus status="accepted" size="medium" />
              </DemoItem>
              <DemoItem>
                <Label>Estado: Rechazada</Label>
                <RequestStatus status="rejected" size="medium" />
              </DemoItem>
              <DemoItem>
                <Label>Estado: Completada</Label>
                <RequestStatus status="completed" size="medium" />
              </DemoItem>
              <Divider />
              <DemoItem>
                <Label>Tamaño Small</Label>
                <RequestStatus status="pending" size="small" />
              </DemoItem>
              <DemoItem>
                <Label>Tamaño Medium</Label>
                <RequestStatus status="accepted" size="medium" />
              </DemoItem>
              <DemoItem>
                <Label>Tamaño Large</Label>
                <RequestStatus status="rejected" size="large" />
              </DemoItem>
              <Divider />
              <DemoItem>
                <Label>Sin icono</Label>
                <RequestStatus status="pending" showIcon={false} />
              </DemoItem>
              <DemoItem>
                <Label>Texto personalizado</Label>
                <RequestStatus status="accepted" label="✓ Confirmada" showIcon={false} />
              </DemoItem>
            </StatusGrid>
          </DemoBox>
        </Section>

        {/* PALETA DE COLORES */}
        <Section>
          <h2>4. Paleta de Colores</h2>
          <p style={{ fontFamily: typography.families.body, color: colors.text.secondary, marginBottom: spacing.lg }}>
            Colores validados WCAG 2.1 Level AA. Cumplen requisitos de accesibilidad y contraste.
          </p>
          <ColorGrid>
            <ColorBox style={{ backgroundColor: colors.primary.menta }}>
              Primario<p>{colors.primary.menta}</p>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.primary.darkGray }}>
              Texto<p>{colors.primary.darkGray}</p>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.secondary.red }}>
              Acción<p>{colors.secondary.red}</p>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.secondary.yellow }}>
              Resaltado<p>{colors.secondary.yellow}</p>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.semantic.success }}>
              Éxito<p>{colors.semantic.success}</p>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.semantic.error }}>
              Error<p>{colors.semantic.error}</p>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.semantic.info }}>
              Info<p>{colors.semantic.info}</p>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.secondary.lightGray, color: colors.text.primary }}>
              Fondo<p>{colors.secondary.lightGray}</p>
            </ColorBox>
          </ColorGrid>
        </Section>

        {/* TIPOGRAFÍA */}
        <Section>
          <h2>5. Tipografía</h2>
          <p style={{ fontFamily: typography.families.body, color: colors.text.secondary, marginBottom: spacing.lg }}>
            Escala modular Major Third (1.25). Familias: Poppins (display) e Inter (body).
          </p>
          <DemoBox>
            <TypographyExample>
              <div>
                <h1 style={{ ...typography.styles.h1, margin: 0 }}>H1 - Título Principal (39px Bold)</h1>
                <p style={{ ...typography.styles.caption, margin: `${spacing.sm} 0 0 0` }}>Poppins Bold • Letter-spacing: -0.02em</p>
              </div>
              <div>
                <h2 style={{ ...typography.styles.h2, margin: 0 }}>H2 - Encabezado de Sección (31px Semibold)</h2>
                <p style={{ ...typography.styles.caption, margin: `${spacing.sm} 0 0 0` }}>Poppins Semibold • Letter-spacing: -0.01em</p>
              </div>
              <div>
                <h3 style={{ ...typography.styles.h3, margin: 0 }}>H3 - Subtítulo (25px Medium)</h3>
                <p style={{ ...typography.styles.caption, margin: `${spacing.sm} 0 0 0` }}>Poppins Medium • Letter-spacing: 0em</p>
              </div>
              <div>
                <p style={{ ...typography.styles.body1, margin: 0 }}>Cuerpo 1 - Texto destacado (20px Regular)</p>
                <p style={{ ...typography.styles.caption, margin: `${spacing.sm} 0 0 0` }}>Inter Regular • Letter-spacing: 0.01em</p>
              </div>
              <div>
                <p style={{ ...typography.styles.body2, margin: 0 }}>Cuerpo 2 - Texto general (16px Regular)</p>
                <p style={{ ...typography.styles.caption, margin: `${spacing.sm} 0 0 0` }}>Inter Regular • Line-height: 1.5</p>
              </div>
              <div>
                <p style={{ ...typography.styles.caption, margin: 0 }}>Caption - Metadatos (13px Regular)</p>
                <p style={{ ...typography.styles.caption, margin: `${spacing.sm} 0 0 0` }}>Inter Regular • Letter-spacing: 0.02em</p>
              </div>
            </TypographyExample>
          </DemoBox>
        </Section>

        {/* ESPACIADO */}
        <Section>
          <h2>6. Sistema de Espaciado</h2>
          <p style={{ fontFamily: typography.families.body, color: colors.text.secondary, marginBottom: spacing.lg }}>
            Basado en unidad de 8pt (8pt Grid System). Proporciona consistencia y armonía visual.
          </p>
          <DemoBox>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
              <div>
                <Label>Espacios Base</Label>
                <div style={{ margin: `${spacing.md} 0` }}>
                  <small>xs: 4px</small>
                </div>
                <div style={{ margin: `${spacing.md} 0` }}>
                  <small>sm: 8px</small>
                </div>
                <div style={{ margin: `${spacing.md} 0` }}>
                  <small>md: 16px</small>
                </div>
                <div style={{ margin: `${spacing.md} 0` }}>
                  <small>lg: 24px</small>
                </div>
                <div style={{ margin: `${spacing.md} 0` }}>
                  <small>xl: 32px</small>
                </div>
                <div style={{ margin: `${spacing.md} 0` }}>
                  <small>xxl: 40px</small>
                </div>
              </div>
              <div>
                <Label>Uso en Componentes</Label>
                <small style={{ color: colors.text.secondary }}>
                  • Padding en tarjetas: {spacing.lg}<br/>
                  • Margin entre secciones: {spacing.xxl}<br/>
                  • Gap en grillas: {spacing.lg}<br/>
                  • Padding en botones: {spacing.md}<br/>
                  • Border-radius: 8px - 12px<br/>
                </small>
              </div>
            </div>
          </DemoBox>
        </Section>

        <Footer>
          <p>
            🎨 <strong>Sistema de Diseño Nemi v1.0</strong><br/>
            Especificaciones completas según el documento de diseño.<br/>
            Accesibilidad WCAG 2.1 Level AA • Mobile-First Responsive
          </p>
        </Footer>
      </Container>
    </>
  );
};

export default ComponentShowcase;
