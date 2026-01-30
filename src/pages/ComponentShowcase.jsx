import styled from 'styled-components';
import { ServiceCard } from '../components/cards/ServiceCard';
import { RequestStatus } from '../components/badges/RequestStatus';
import { ButtonPrimary } from '../components/buttons/ButtonPrimary';
import { colors, spacing, typography, transitions, borderRadius } from '../styles/designTokens';

/**
 * Página de Demostración de Componentes
 * Muestra todos los componentes del sistema de diseño en acción
 */

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.background.light};
  padding: ${spacing.lg};
`;

const NavBar = styled.nav`
  background: white;
  padding: ${spacing.md} ${spacing.lg};
  border-bottom: 2px solid ${colors.primary.menta};
  margin-bottom: ${spacing.xl};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto ${spacing.xxl};
  text-align: center;
  
  h1 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h1};
    color: ${colors.primary.menta};
    margin: 0 0 ${spacing.md} 0;
  }
  
  p {
    font-family: ${typography.families.body};
    font-size: ${typography.sizes.body1};
    color: ${colors.text.secondary};
    margin: 0;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto ${spacing.xxl};
  
  h2 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h2};
    color: ${colors.text.primary};
    margin: 0 0 ${spacing.lg} 0;
    padding-bottom: ${spacing.md};
    border-bottom: 3px solid ${colors.primary.menta};
  }
  
  p {
    font-family: ${typography.families.body};
    color: ${colors.text.secondary};
    margin: 0 0 ${spacing.lg} 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing.lg};
`;

const DemoBox = styled.div`
  background: white;
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: ${transitions.normal};
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
`;

const DemoItem = styled.div`
  margin-bottom: ${spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${spacing.md};
`;

const ColorBox = styled.div`
  padding: ${spacing.lg};
  border-radius: ${borderRadius.md};
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
  
  small {
    display: block;
    margin-top: ${spacing.sm};
    opacity: 0.9;
    font-size: 10px;
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${spacing.xxl} ${spacing.lg};
  color: ${colors.text.secondary};
  margin-top: ${spacing.xxl};
  border-top: 1px solid ${colors.border};
`;

export const ComponentShowcase = () => {
  return (
    <>
      <NavBar>
        <strong style={{ color: colors.primary.menta, fontSize: '20px' }}>🍔 Nemi</strong>
      </NavBar>

      <Container>
        <Header>
          <h1>Sistema de Diseño Nemi</h1>
          <p>Componentes, tipografía, colores y espaciado del proyecto</p>
        </Header>

        {/* BOTONES */}
        <Section>
          <h2>1. Botones</h2>
          <DemoBox>
            <ButtonGroup>
              <DemoItem>
                <Label>Primary - Verde Menta</Label>
                <ButtonPrimary variant="primary" fullWidth>
                  Solicitar Servicio
                </ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Danger - Rojo</Label>
                <ButtonPrimary variant="danger" fullWidth>
                  Rechazar
                </ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Secondary - Gris</Label>
                <ButtonPrimary variant="secondary" fullWidth>
                  Cancelar
                </ButtonPrimary>
              </DemoItem>
              <DemoItem>
                <Label>Deshabilitado</Label>
                <ButtonPrimary disabled fullWidth>
                  No disponible
                </ButtonPrimary>
              </DemoItem>
            </ButtonGroup>
          </DemoBox>
        </Section>

        {/* TARJETAS */}
        <Section>
          <h2>2. Tarjetas de Servicio</h2>
          <p>Componente principal para proveedores con imagen, rating, distancia y precio.</p>
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
            />
          </Grid>
        </Section>

        {/* ESTADOS */}
        <Section>
          <h2>3. Estados de Solicitud</h2>
          <p>Badges semánticos para indicar el estado de las solicitudes.</p>
          <DemoBox>
            <DemoItem>
              <Label>Pendiente</Label>
              <RequestStatus status="pending" size="medium" />
            </DemoItem>
            <DemoItem>
              <Label>Aceptada</Label>
              <RequestStatus status="accepted" size="medium" />
            </DemoItem>
            <DemoItem>
              <Label>Rechazada</Label>
              <RequestStatus status="rejected" size="medium" />
            </DemoItem>
            <DemoItem>
              <Label>Completada</Label>
              <RequestStatus status="completed" size="medium" />
            </DemoItem>
          </DemoBox>
        </Section>

        {/* COLORES */}
        <Section>
          <h2>4. Paleta de Colores</h2>
          <p>Colores validados WCAG 2.1 Level AA para accesibilidad.</p>
          <ColorGrid>
            <ColorBox style={{ backgroundColor: colors.primary.menta }}>
              Primario<small>{colors.primary.menta}</small>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.secondary.red }}>
              Acción<small>{colors.secondary.red}</small>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.secondary.yellow, color: colors.text.primary }}>
              Resaltado<small>{colors.secondary.yellow}</small>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.semantic.success }}>
              Éxito<small>{colors.semantic.success}</small>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.semantic.error }}>
              Error<small>{colors.semantic.error}</small>
            </ColorBox>
            <ColorBox style={{ backgroundColor: colors.semantic.info }}>
              Info<small>{colors.semantic.info}</small>
            </ColorBox>
          </ColorGrid>
        </Section>

        <Footer>
          <p>
            🎨 <strong>Sistema de Diseño Nemi v1.0</strong><br/>
            Accesibilidad WCAG 2.1 • Mobile-First Responsive
          </p>
        </Footer>
      </Container>
    </>
  );
};

export default ComponentShowcase;
