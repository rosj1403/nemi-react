import styled from 'styled-components';
import { useState, useMemo } from 'react';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { ButtonPrimary } from '../../components/buttons/ButtonPrimary';
import { colors, spacing, typography, borderRadius, transitions } from '../../styles/designTokens';

/**
 * Página de inicio del cliente
 * Busca y filtra proveedores de servicios
 */

const Container = styled.div`
  min-height: 100vh;
  background: ${colors.background.light};
`;

const Header = styled.header`
  background: linear-gradient(135deg, ${colors.primary.menta} 0%, #009270 100%);
  padding: ${spacing.xl} ${spacing.lg};
  color: white;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h1};
    margin: 0 0 ${spacing.sm} 0;
  }

  p {
    font-family: ${typography.families.body};
    font-size: ${typography.sizes.body2};
    margin: 0;
    opacity: 0.95;
  }
`;

const SearchBar = styled.div`
  max-width: 1200px;
  margin: -${spacing.lg} auto 0;
  padding: 0 ${spacing.lg};
  position: relative;
  z-index: 10;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${spacing.md} ${spacing.lg};
  font-size: ${typography.sizes.body1};
  border: none;
  border-radius: ${borderRadius.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: ${typography.families.body};

  &:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(0, 184, 148, 0.3);
  }

  &::placeholder {
    color: ${colors.text.secondary};
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.lg};
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background: white;
  padding: ${spacing.lg};
  border-radius: ${borderRadius.lg};
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const FilterGroup = styled.div`
  margin-bottom: ${spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterTitle = styled.h3`
  font-family: ${typography.families.display};
  font-size: ${typography.sizes.body1};
  color: ${colors.text.primary};
  margin: 0 0 ${spacing.md} 0;
  font-weight: ${typography.weights.bold};
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.sm};
  cursor: pointer;
  font-family: ${typography.families.body};
  color: ${colors.text.secondary};

  input {
    cursor: pointer;
  }

  &:hover {
    color: ${colors.text.primary};
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  cursor: pointer;
`;

const RangeValue = styled.div`
  font-family: ${typography.families.body};
  font-size: ${typography.sizes.caption};
  color: ${colors.primary.menta};
  font-weight: ${typography.weights.semibold};
  margin-top: ${spacing.sm};
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.lg};

  h2 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h2};
    color: ${colors.text.primary};
    margin: 0;
  }

  p {
    font-family: ${typography.families.body};
    color: ${colors.text.secondary};
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${spacing.lg};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.xxl};
  background: white;
  border-radius: ${borderRadius.lg};
  grid-column: 1 / -1;

  h3 {
    font-family: ${typography.families.display};
    font-size: ${typography.sizes.h3};
    color: ${colors.text.primary};
    margin: 0 0 ${spacing.md} 0;
  }

  p {
    font-family: ${typography.families.body};
    color: ${colors.text.secondary};
    margin: 0;
  }
`;

// Mock data - Proveedores
const MOCK_PROVIDERS = [
  {
    id: 1,
    name: 'Taquería Don Carlos',
    specialty: 'Tacos al pastor',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561d1b?w=400&h=225&fit=crop',
    rating: 4.8,
    reviewCount: 42,
    distance: 2.5,
    priceRange: '$200-400',
    badge: 'Verificado',
    category: 'taquerias',
    minPrice: 200,
  },
  {
    id: 2,
    name: 'Parrillada La Mexicana',
    specialty: 'Carne asada',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=225&fit=crop',
    rating: 4.5,
    reviewCount: 28,
    distance: 3.8,
    priceRange: '$300-500',
    badge: 'Popular',
    category: 'parrilladas',
    minPrice: 300,
  },
  {
    id: 3,
    name: 'Taquería Express',
    specialty: 'Tacos de canasta',
    image: 'https://images.unsplash.com/photo-1585238341710-4b51926f5f90?w=400&h=225&fit=crop',
    rating: 4.3,
    reviewCount: 15,
    distance: 1.2,
    priceRange: '$150-250',
    category: 'taquerias',
    minPrice: 150,
  },
  {
    id: 4,
    name: 'Barbacoa Tradicional',
    specialty: 'Barbacoa de res',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=225&fit=crop',
    rating: 4.7,
    reviewCount: 35,
    distance: 4.2,
    priceRange: '$250-400',
    badge: 'Recomendado',
    category: 'barbacoa',
    minPrice: 250,
  },
  {
    id: 5,
    name: 'Quesadillas Casa María',
    specialty: 'Quesadillas rellenas',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b5?w=400&h=225&fit=crop',
    rating: 4.4,
    reviewCount: 22,
    distance: 2.1,
    priceRange: '$120-200',
    category: 'quesadillas',
    minPrice: 120,
  },
  {
    id: 6,
    name: 'Carnitas El Jefe',
    specialty: 'Carnitas de cerdo',
    image: 'https://images.unsplash.com/photo-1618449049551-1e7d6e49fd26?w=400&h=225&fit=crop',
    rating: 4.9,
    reviewCount: 58,
    distance: 1.8,
    priceRange: '$180-350',
    badge: 'Top Rated',
    category: 'carnitas',
    minPrice: 180,
  },
];

export const ClientHomeNew = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Filtrar proveedores
  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(provider.category);

      const matchesDistance = provider.distance <= maxDistance;
      const matchesRating = provider.rating >= minRating;
      const matchesPrice = provider.minPrice <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDistance &&
        matchesRating &&
        matchesPrice
      );
    });
  }, [searchTerm, selectedCategories, maxDistance, minRating, maxPrice]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setMaxDistance(10);
    setMinRating(0);
    setMaxPrice(500);
  };

  return (
    <Container>
      {/* HEADER */}
      <Header>
        <HeaderContent>
          <h1>🍔 Nemi</h1>
          <p>Encuentra el mejor servicio de comida a tu alrededor</p>
        </HeaderContent>
      </Header>

      {/* SEARCH BAR */}
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Busca taquerías, parrilladas, barbacoa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      {/* MAIN CONTENT */}
      <MainContent>
        {/* SIDEBAR - FILTROS */}
        <Sidebar>
          <FilterGroup>
            <FilterTitle>Categoría</FilterTitle>
            <FilterOption>
              <input
                type="checkbox"
                checked={selectedCategories.includes('taquerias')}
                onChange={() => handleCategoryChange('taquerias')}
              />
              Taquerías
            </FilterOption>
            <FilterOption>
              <input
                type="checkbox"
                checked={selectedCategories.includes('parrilladas')}
                onChange={() => handleCategoryChange('parrilladas')}
              />
              Parrilladas
            </FilterOption>
            <FilterOption>
              <input
                type="checkbox"
                checked={selectedCategories.includes('barbacoa')}
                onChange={() => handleCategoryChange('barbacoa')}
              />
              Barbacoa
            </FilterOption>
            <FilterOption>
              <input
                type="checkbox"
                checked={selectedCategories.includes('carnitas')}
                onChange={() => handleCategoryChange('carnitas')}
              />
              Carnitas
            </FilterOption>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Distancia</FilterTitle>
            <RangeSlider
              type="range"
              min="0"
              max="20"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
            />
            <RangeValue>Hasta {maxDistance} km</RangeValue>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Rating mínimo</FilterTitle>
            <RangeSlider
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            />
            <RangeValue>⭐ {minRating}</RangeValue>
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>Precio máximo</FilterTitle>
            <RangeSlider
              type="range"
              min="0"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <RangeValue>${maxPrice}</RangeValue>
          </FilterGroup>

          <FilterGroup>
            <ButtonPrimary
              variant="secondary"
              fullWidth
              onClick={handleResetFilters}
            >
              Resetear filtros
            </ButtonPrimary>
          </FilterGroup>
        </Sidebar>

        {/* CONTENT - TARJETAS */}
        <ContentArea>
          <ResultsHeader>
            <h2>Proveedores disponibles</h2>
            <p>{filteredProviders.length} resultados</p>
          </ResultsHeader>

          {filteredProviders.length > 0 ? (
            <Grid>
              {filteredProviders.map((provider) => (
                <ServiceCard
                  key={provider.id}
                  image={provider.image}
                  name={provider.name}
                  specialty={provider.specialty}
                  rating={provider.rating}
                  reviewCount={provider.reviewCount}
                  distance={`${provider.distance} km`}
                  priceRange={provider.priceRange}
                  badge={provider.badge}
                  onClick={() => console.log(`Clicked: ${provider.name}`)}
                />
              ))}
            </Grid>
          ) : (
            <EmptyState>
              <h3>No hay resultados</h3>
              <p>Intenta ajustar los filtros o busca otro proveedor</p>
            </EmptyState>
          )}
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default ClientHomeNew;
