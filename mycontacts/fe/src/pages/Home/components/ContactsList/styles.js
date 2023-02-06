import styled, { css } from 'styled-components'

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;

  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transform: ${({ orderBy }) =>
        orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
      transition: transform 0.2s ease-in;
    }
  }
`

export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    box-shadow: ${theme.colors.boxshadow};
    height: 80px;
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
      margin-top: 16px;
    }

    .info {
      .contact-name {
        display: flex;
        align-items: center;

        small {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
          font-weight: bold;
          text-transform: uppercase;
          padding: 4px;
          border-radius: 4px;
          margin-left: 8px;
        }
      }

      span {
        display: block;
        font-size: 14px;
        color: ${theme.colors.gray[200]};
      }
    }

    .actions {
      display: flex;
      align-items: center;

      button {
        background: transparent;
        border: none;
        margin-left: 8px;
      }
    }
  `}
`
