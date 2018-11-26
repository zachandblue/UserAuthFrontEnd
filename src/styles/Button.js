import styled from 'styled-components';

export const Button = styled.button`
  width: auto;
  background: ${props => props.color || '#282c34'};
  height: ${props => props.height};
  width: ${props => props.width};
  max-width: 90vw;
  color: white;
  border: 0;
  border-radius: 5px;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
  margin-top: 10px;
  transition: all 0.5s;

  &:focus {
    outline: none;
    transform: scale(1.03);
  }
  &:hover {
    transform: scale(1.05);
  }
  &:disabled {
    background: #484c54;
  }
`;
