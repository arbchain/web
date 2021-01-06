import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  height: 80vh;

  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 5px;
  .form__heading {
    h2 {
      margin-bottom: 30px;
    }
  }

  .anticon svg {
    color: rgba(0, 0, 0, 0.85);
  }
`;

export const RegistrationContainer = styled.div`
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 5px;
  .form__container {
    width: 50%;
  }
  .input {
    height: 40px;
    border-radius: 4px;
  }
`;
