import styled from 'styled-components';

export const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #eee;
    border-radius: 5px;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }

  .error {
    border: 1px solid red;
  }

  button,
  input[type='submit'] {
    width: auto;
    background: #282c34;
    color: white;
    border: 0;
    border-radius: 5px;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    margin-top: 10px;
    &:disabled {
      background: #484c54;
    }
  }
  p {
    justify-content: flex-end;
    font-size: 0.8rem;
    color: red;
  }
  .spacer {
    height: 19px;
    width: 10px;
  }
`;
