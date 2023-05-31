import styled, { css } from 'styled-components'

// export const StyledButton = styled.button`
//   ${({ theme, danger }) => css`
//     height: 52px;
//     border: none;
//     padding: 0 16px;
//     background: ${danger
//       ? theme.colors.danger.main
//       : theme.colors.primary.main};
//     font-size: 16px;
//     font-weight: bold;
//     box-shadow: ${theme.colors.boxshadow};
//     color: ${theme.colors.white};
//     border-radius: 4px;
//     transition: background 0.2s ease-in;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     &:hover {
//       background: ${danger
//         ? theme.colors.danger.light
//         : theme.colors.primary.light};
//     }

//     &:active {
//       background: ${danger
//         ? theme.colors.danger.dark
//         : theme.colors.primary.dark};
//     }

//     &[disabled] {
//       background: #ccc !important;
//       cursor: default !important;
//     }
//   `}
// `

export const StyledButton = styled.button`
  height: 52px;
  border: none;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.colors.boxshadow};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  transition: background 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background: ${theme.colors.danger.main};

      &:hover {
        background: ${theme.colors.danger.light};
      }

      &:active {
        background: ${theme.colors.danger.dark};
      }
    `}
`
