import styled from 'styled-components';
import { ServiceCard } from '../components/cards/ServiceCard';
import { RequestStatus } from '../components/badges/RequestStatus';
import { ButtonPrimary } from '../components/buttons/ButtonPrimary';
import { colors, spacing, typography } from '../styles/designTokens';

/**
 * Página de Demostración de Componentes
 * Muestra todos los componentes del sistema de diseño en acción
 */

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.background.light};
  padding: ${spacing.lg};
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto ${spacing.xxl};
  
  h1 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h1};
    color: ${colors.text.primary};
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
    border-bottom: 2px solid ${colors.border};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.lg};
`;

const DemoBox = styled.div`
  background: white;
  padding: ${spacing.lg};
  border-radius: 12px;
  border: 1px solid ${colors.border};
`;

const Label = styled.label`
  display: block;
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.sm};
  text-transform: uppercase;
  font-weight: ${typography.weights.semibold};
`;

const StatusGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const ComponentShowcase = () => {
  const handleServiceCardClick = (name) => {
    console.log('Clicked on:', name);
  };

  const handleFavorite = (name) => {
    console.log('Favorited:', name);
  };

  return (
    <Container>
      <Header>
        <h1>🎨 Componentes Nemi</h1>
        <p>Demostración del sistema de diseño - Componentes creados</p>
      </Header>

      {/* BUTTONS */}
      <Section>
        <h2>Botones</h2>
        <DemoBox>
          <ButtonGroup>
            <div>
              <Label>Primary (Verde)</Label>
              <ButtonPrimary variant="primary" fullWidth>
                Solicitar Servicio
              </ButtonPrimary>
            </div>
            <div>
              <Label>Danger (Rojo)</Label>
              <ButtonPrimary variant="danger" fullWidth>
                Rechazar Solicitud
              </ButtonPrimary>
            </div>
            <div>
              <Label>Secondary (Gris)</Label>
              <ButtonPrimary variant="secondary" fullWidth>
                Cancelar
              </ButtonPrimary>
            </div>
            <div>
              <Label>Deshabilitado</Label>
              <ButtonPrimary disabled fullWidth>
                No disponible
              </ButtonPrimary>
            </div>
            <div>
              <Label>Tamaño Small</Label>
              <ButtonPrimary size="small">Pequeño</ButtonPrimary>
            </div>
            <div>
              <Label>Tamaño Large</Label>
              <ButtonPrimary size="large" fullWidth>
                Botón Grande
              </ButtonPrimary>
            </div>
          </ButtonGroup>
        </DemoBox>
      </Section>

      {/* SERVICE CARDS */}
      <Section>
        <h2>Tarjetas de Servicio (ServiceCard)</h2>
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
            isFavorite={false}
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
            isFavorite={false}
          />
          <ServiceCard
            name="Sin imagen"
            specialty="Ejemplo sin foto"
            rating={5.0}
            reviewCount={5}
            distance="0.5 km"
            priceRange="$250-350"
            onClick={() => handleServiceCardClick('Sin imagen')}
            onFavorite={handleFavorite}
          />
        </Grid>
      </Section>

      {/* REQUEST STATUS */}
      <Section>
        <h2>Estados de Solicitud (RequestStatus)</h2>
        <DemoBox>
          <StatusGrid>
            <div>
              <Label>Pendiente (Esperando respuesta)</Label>
              <RequestStatus status="pending" size="medium" />
            </div>
            <div>
              <Label>Aceptada (Proveedor confirmó)</Label>
              <RequestStatus status="accepted" size="medium" />
            </div>
            <div>
              <Label>Rechazada (No disponible)</Label>
              <RequestStatus status="rejected" size="medium" />
            </div>
            <div>
              <Label>Completada (Servicio finalizado)</Label>
              <RequestStatus status="completed" size="medium" />
            </div>

            <hr style={{ margin: `${spacing.lg} 0` }} />

            <div>
              <Label>Pequeño</Label>
              <RequestStatus status="pending" size="small" />
            </div>
            <div>
              <Label>Mediano</Label>
              <RequestStatus status="accepted" size="medium" />
            </div>
            <div>
              <Label>Grande</Label>
              <RequestStatus status="rejected" size="large" />
            </div>

            <hr style={{ margin: `${spacing.lg} 0` }} />

            <div>
              <Label>Sin icono</Label>
              <RequestStatus status="pending" showIcon={false} />
            </div>
            <div>
              <Label>Con texto personalizado</Label>
              <RequestStatus status="accepted" label="Confirmada por proveedor" />
            </div>
          </StatusGrid>
        </DemoBox>
      </Section>

      {/* COLOR PALETTE */}
      <Section>
        <h2>Paleta de Colores</h2>
        <Grid>
          <DemoBox style={{ backgroundColor: colors.primary.menta }}>
            <Label style={{ color: 'white' }}>Primario: Menta</Label>
            <p style={{ color: 'white', margin: 0 }}>{colors.primary.menta}</p>
          </DemoBox>
          <DemoBox style={{ backgroundColor: colors.secondary.red }}>
            <Label style={{ color: 'white' }}>Secundario: Rojo</Label>
            <p style={{ color: 'white', margin: 0 }}>{colors.secondary.red}</p>
          </DemoBox>
          <DemoBox style={{ backgroundColor: colors.secondary.yellow }}>
            <Label>Secundario: Amarillo</Label>
            <p style={{ margin: 0 }}>{colors.secondary.yellow}</p>
          </DemoBox>
          <DemoBox style={{ backgroundColor: colors.semantic.success }}>
            <Label style={{ color: 'white' }}>Semántico: Éxito</Label>
            <p style={{ color: 'white', margin: 0 }}>{colors.semantic.success}</p>
          </DemoBox>
        </Grid>
      </Section>

      <Footer>
        <p>Componentes del sistema de diseño Nemi - Versión Beta</p>
      </Footer>
    </Container>
  );
};

const Footer = styled.footer`
  text-align: center;
  padding: ${spacing.xxl};
  color: ${colors.text.secondary};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
`;

export default ComponentShowcase;
