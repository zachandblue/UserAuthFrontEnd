import styled from 'styled-components';

export const FormContainer = styled.div`
  margin: 30px auto;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: space-around;

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
