import styled from 'styled-components';

export const LoggedIn = styled.div`
  margin: 0 auto;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  h2 {
    margin: 20px;
  }
  @media (max-width: 600px) {
    height: auto;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0;
    form {
      margin-top: 30px;
    }
  }
`;
