import styled from 'styled-components';
import { colors, spacing, typography, transitions, borderRadius, shadows } from '../../styles/designTokens';

/**
 * ServiceCard - Tarjeta de Servicio de Taquero
 * Componente principal para mostrar información del proveedor
 * 
 * Props:
 * - image: URL de la imagen del taquero
 * - name: string - Nombre del taquero o taquería
 * - specialty: string - Tipo de comida (ej: "Tacos al pastor")
 * - rating: number - Calificación (0-5)
 * - reviewCount: number - Cantidad de reseñas
 * - distance: string - Distancia (ej: "2.5 km")
 * - priceRange: string - Rango de precio (ej: "$200-400")
 * - badge: string (optional) - Insignia de verificación ("verified", "popular", etc.)
 * - onClick: function - Callback cuando se hace click
 * - onFavorite: function - Callback para agregar a favoritos
 * - isFavorite: boolean - Si está en favoritos
 */

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.background.default};
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  box-shadow: ${shadows.md};
  transition: ${transitions.normal};
  cursor: pointer;
  max-width: 100%;
  
  &:hover {
    box-shadow: ${shadows.lg};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${colors.secondary.lightGray};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${transitions.normal};
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${colors.secondary.lightGray} 0%, ${colors.secondary.neutralGray} 100%);
  color: ${colors.text.secondary};
  font-size: 48px;
`;

const Badge = styled.span`
  position: absolute;
  top: ${spacing.md};
  right: ${spacing.md};
  background: ${colors.primary.menta};
  color: white;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.sm};
  font-size: 12px;
  font-weight: ${typography.weights.bold};
  text-transform: uppercase;
  z-index: 1;
  box-shadow: ${shadows.md};
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: ${spacing.md};
  left: ${spacing.md};
  width: 40px;
  height: 40px;
  border-radius: ${borderRadius.round};
  border: none;
  background: rgba(255, 255, 255, 0.95);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: ${transitions.normal};
  box-shadow: ${shadows.sm};
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Content = styled.div`
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${spacing.sm};
`;

const TitleSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const Name = styled.h3`
  margin: 0;
  font-family: ${typography.families.display};
  font-size: ${typography.sizes.h3};
  font-weight: ${typography.weights.bold};
  color: ${colors.text.primary};
  line-height: ${typography.lineHeights.h3};
`;

const Specialty = styled.p`
  margin: 0;
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.text.secondary};
  font-weight: ${typography.weights.regular};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  
  .stars {
    color: ${colors.secondary.yellow};
    font-size: 14px;
  }
  
  .score {
    font-family: ${typography.families.body};
    font-size: ${typography.sizes.body2};
    font-weight: ${typography.weights.bold};
    color: ${colors.text.primary};
  }
  
  .count {
    font-family: ${typography.families.body};
    font-size: ${typography.sizes.caption};
    color: ${colors.text.secondary};
  }
`;

const Separator = styled.span`
  width: 4px;
  height: 4px;
  border-radius: ${borderRadius.round};
  background: ${colors.border};
`;

const Distance = styled.span`
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.body2};
  color: ${colors.text.secondary};
  font-weight: ${typography.weights.regular};
`;

const Price = styled.span`
  font-family: ${typography.families.display};
  font-size: ${typography.sizes.body1};
  font-weight: ${typography.weights.bold};
  color: ${colors.primary.menta};
`;

const ActionButton = styled.button`
  width: 100%;
  padding: ${spacing.md};
  background: ${colors.secondary.red};
  color: white;
  border: none;
  border-radius: ${borderRadius.md};
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.body2};
  font-weight: ${typography.weights.bold};
  cursor: pointer;
  transition: ${transitions.normal};
  margin-top: ${spacing.sm};
  
  &:hover {
    background: #c23030;
    box-shadow: ${shadows.md};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`;

export const ServiceCard = ({
  image,
  name = 'Taquería Nemi',
  specialty = 'Tacos al pastor',
  rating = 4.8,
  reviewCount = 23,
  distance = '2.5 km',
  priceRange = '$200-400',
  badge,
  onClick,
  onFavorite,
  isFavorite = false,
}) => {
  const renderStars = (value) => {
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(5 - Math.ceil(value))}
      </>
    );
  };

  return (
    <CardContainer onClick={onClick} role="article" aria-label={`${name} - ${specialty}`}>
      <ImageContainer>
        {image ? (
          <Image src={image} alt={name} />
        ) : (
          <ImagePlaceholder>🍔</ImagePlaceholder>
        )}
        {badge && <Badge>{badge}</Badge>}
        <FavoriteButton
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(name);
          }}
          aria-label={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </FavoriteButton>
      </ImageContainer>

      <Content>
        <Header>
          <TitleSection>
            <Name>{name}</Name>
            <Specialty>{specialty}</Specialty>
          </TitleSection>
        </Header>

        <InfoRow>
          <Rating>
            <span className="stars">{renderStars(rating)}</span>
            <span className="score">{rating.toFixed(1)}</span>
            <span className="count">({reviewCount})</span>
          </Rating>
          <Separator />
          <Distance>📍 {distance}</Distance>
          <Separator />
          <Price>{priceRange}</Price>
        </InfoRow>

        <ActionButton onClick={() => onClick?.()} role="button">
          Solicitar servicio
        </ActionButton>
      </Content>
    </CardContainer>
  );
};

export default ServiceCard;
