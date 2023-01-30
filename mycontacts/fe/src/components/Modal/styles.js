import styled, { css } from 'styled-components'

export const Overlay = styled.div`
  background: ${({ theme }) => theme.colors.modal};
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Container = styled.div`
  ${({ theme, danger }) => css`
    width: 100%;
    max-width: 450px;
    background: ${theme.colors.white};
    border-radius: 4px;
    padding: 24px;
    box-shadow: ${theme.colors.boxshadow};

    > h1 {
      font-size: 22px;
      color: ${danger ? theme.colors.danger.main : theme.colors.gray[900]};
    }

    .modal-body {
      margin-top: 32px;
    }
  `}
`

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`
