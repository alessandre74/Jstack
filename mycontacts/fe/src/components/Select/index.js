import styled, { css } from 'styled-components'

export const Select = styled.select`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.white};
    border: 2px solid ${theme.colors.white};
    box-shadow: ${theme.colors.boxshadow};
    height: 52px;
    border-radius: 4px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
    appearance: none;

    &:focus {
      // border-color no focus mais o border acima faz com que o input não pule, somente a cor da borda seja alterada.
      border-color: ${theme.colors.primary.main};
    }

    &[disabled] {
      background-color: ${({ theme }) => theme.colors.gray[100]};
      border-color: ${({ theme }) => theme.colors.gray[200]};
      opacity: 1;
    }
  `}
`
