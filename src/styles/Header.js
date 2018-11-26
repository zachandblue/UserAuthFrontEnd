import styled from 'styled-components';

export const Header = styled.div`
  background: linear-gradient(#282c34, #20202e);
  min-height: 20vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  h1 {
    margin-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 500px) {
    font-size: calc(10px + 1.4vmin);
    img {
      height: 100px;
    }
  }
`;
