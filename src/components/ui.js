import styled from 'styled-components'

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 16px;
`

export const Card = styled.div`
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
`

export const Title = styled.h1`
  font-size: 1.3rem;
  margin: 0 0 8px 0;
`

export const Subtitle = styled.p`
  margin: 0 0 12px 0;
  color: #444;
`

export const Row = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

export const Spacer = styled.div`
  height: ${props => props.h || 12}px;
`

export const Button = styled.button`
  min-height: 48px;
  min-width: 48px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${props => (props.variant === 'outline' ? 'var(--nemi-dark)' : 'transparent')};
  background: ${props => {
    if (props.variant === 'danger') return 'var(--nemi-danger)'
    if (props.variant === 'outline') return 'transparent'
    return 'var(--nemi-mint)'
  }};
  color: ${props => (props.variant === 'outline' ? 'var(--nemi-dark)' : '#fff')};
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Input = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 12px 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #fff;
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #fff;
`

export const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 600;
  display: block;
  margin: 10px 0 6px 0;
`

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #f1f1f1;
  font-size: 0.85rem;
`

export const Muted = styled.p`
  margin: 0;
  color: #555;
`

export const ErrorText = styled.p`
  margin: 8px 0 0 0;
  color: var(--nemi-danger);
  font-weight: 600;
`
