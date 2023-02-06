import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: ${({ theme }) => theme.colors.boxshadow};
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`
