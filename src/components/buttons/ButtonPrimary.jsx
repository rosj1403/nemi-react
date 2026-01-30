import styled from 'styled-components';
import { colors, spacing, typography, transitions, borderRadius } from '../../styles/designTokens';

/**
 * Botón Primario - Componente de acción principal
 * Usado para "Solicitar Servicio", "Confirmar", etc.
 * 
 * Props:
 * - variant: 'primary' (verde) | 'danger' (rojo) | 'secondary' (gris)
 * - size: 'small' | 'medium' | 'large'
 * - disabled: boolean
 * - fullWidth: boolean
 * - onClick: function
 * - children: React.ReactNode
 */

const StyledButton = styled.button`
  /* Base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  border: none;
  cursor: pointer;
  font-family: ${typography.families.body};
  font-weight: ${typography.weights.semibold};
  transition: ${transitions.normal};
  border-radius: ${borderRadius.md};
  
  /* Accesibilidad */
  min-height: 48px;
  min-width: 48px;
  
  /* Tamaños */
  ${(props) => {
    switch (props.size) {
      case 'small':
        return `
          padding: ${spacing.sm} ${spacing.md};
          font-size: 14px;
        `;
      case 'large':
        return `
          padding: ${spacing.md} ${spacing.xl};
          font-size: 18px;
        `;
      case 'medium':
      default:
        return `
          padding: ${spacing.md} ${spacing.lg};
          font-size: 16px;
        `;
    }
  }};

  /* Ancho completo */
  ${(props) => props.fullWidth && 'width: 100%;'}

  /* Variantes de color */
  ${(props) => {
    switch (props.variant) {
      case 'danger':
        return `
          background-color: ${colors.secondary.red};
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #c23030;
            box-shadow: 0 4px 12px rgba(214, 48, 49, 0.3);
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      case 'secondary':
        return `
          background-color: ${colors.secondary.lightGray};
          color: ${colors.text.primary};
          border: 1px solid ${colors.border};
          
          &:hover:not(:disabled) {
            background-color: #e8e8e8;
            border-color: ${colors.secondary.neutralGray};
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      case 'primary':
      default:
        return `
          background-color: ${colors.primary.menta};
          color: white;
          
          &:hover:not(:disabled) {
            background-color: #00a87f;
            box-shadow: 0 4px 12px rgba(0, 184, 148, 0.3);
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
    }
  }};

  /* Estado deshabilitado */
  &:disabled {
    background-color: ${colors.secondary.lightGray};
    color: ${colors.text.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Focus para accesibilidad */
  &:focus-visible {
    outline: 2px solid ${colors.primary.menta};
    outline-offset: 2px;
  }
`;

export const ButtonPrimary = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonPrimary;
