import styled from 'styled-components';
import { colors, spacing, typography, borderRadius } from '../../styles/designTokens';

/**
 * RequestStatus - Badge de Estado de Solicitud
 * Muestra el estado actual de una solicitud (Pendiente, Aceptada, Rechazada)
 * 
 * Props:
 * - status: 'pending' | 'accepted' | 'rejected' | 'completed'
 * - size: 'small' | 'medium' | 'large'
 * - showIcon: boolean - Mostrar icono de estado
 * - label: string (optional) - Texto personalizado (por defecto usa status)
 */

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.xs};
  padding: ${(props) => {
    switch (props.size) {
      case 'small':
        return `${spacing.xs} ${spacing.sm}`;
      case 'large':
        return `${spacing.md} ${spacing.lg}`;
      case 'medium':
      default:
        return `${spacing.sm} ${spacing.md}`;
    }
  }};
  border-radius: ${borderRadius.md};
  font-family: ${typography.families.body};
  font-weight: ${typography.weights.semibold};
  font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return typography.sizes.caption;
      case 'large':
        return typography.sizes.body1;
      case 'medium':
      default:
        return typography.sizes.body2;
    }
  }};
  white-space: nowrap;
  
  /* Variantes de estado */
  ${(props) => {
    switch (props.status) {
      case 'accepted':
        return `
          background-color: ${colors.semantic.success};
          color: white;
        `;
      case 'rejected':
        return `
          background-color: ${colors.semantic.error};
          color: white;
        `;
      case 'completed':
        return `
          background-color: ${colors.primary.menta};
          color: white;
        `;
      case 'pending':
      default:
        return `
          background-color: ${colors.secondary.yellow};
          color: ${colors.text.primary};
        `;
    }
  }};
`;

const StatusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
`;

const statusConfig = {
  pending: {
    label: 'Pendiente',
    icon: '⏳',
    color: colors.secondary.yellow,
    bgColor: 'rgba(255, 213, 79, 0.2)',
  },
  accepted: {
    label: 'Aceptada',
    icon: '✓',
    color: colors.semantic.success,
    bgColor: 'rgba(85, 239, 196, 0.2)',
  },
  rejected: {
    label: 'Rechazada',
    icon: '✕',
    color: colors.semantic.error,
    bgColor: 'rgba(214, 48, 49, 0.2)',
  },
  completed: {
    label: 'Completada',
    icon: '✓✓',
    color: colors.primary.menta,
    bgColor: 'rgba(0, 184, 148, 0.2)',
  },
};

export const RequestStatus = ({
  status = 'pending',
  size = 'medium',
  showIcon = true,
  label,
}) => {
  const config = statusConfig[status] || statusConfig.pending;
  const displayLabel = label || config.label;

  return (
    <StatusBadge status={status} size={size} role="status" aria-label={displayLabel}>
      {showIcon && <StatusIcon>{config.icon}</StatusIcon>}
      {displayLabel}
    </StatusBadge>
  );
};

export default RequestStatus;
