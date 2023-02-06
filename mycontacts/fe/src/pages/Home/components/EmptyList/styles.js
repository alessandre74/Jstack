import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    text-align: center;
    line-height: 20px;
    margin-top: 8px;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`
