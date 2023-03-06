import styled, { css } from 'styled-components/native'

interface TextProps {
  weight?: '400' | '600' | '700'
  color?: string
  size?: number
  opacity?: number
}

export const Text = styled.Text<TextProps>`
  ${({ weight, color, size, opacity }) => css`
    font-family: ${weight ? `GeneralSans-${weight}` : 'GeneralSans-400'};
    color: ${color || '#333'};
    font-size: ${size ? `${size}px` : '16px'};
    opacity: ${opacity || 1};
  `}
`
