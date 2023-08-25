import React from 'react';
import { ButtonContainer, ButtonText, Container, Input, LoginBox, LoginButton, RegisterButton, Title } from './style';

const PageLogin = () => {
  return (
      <Container>
        <LoginBox>
        <Title>Login</Title>
          <Input placeholder="Username" />
          <Input placeholder="Password" secureTextEntry />
          <ButtonContainer>
            <LoginButton>
              <ButtonText>Login</ButtonText>
            </LoginButton>
            <RegisterButton>
              <ButtonText>Register</ButtonText>
            </RegisterButton>
          </ButtonContainer>
        </LoginBox>
      </Container>
  );
}

export default PageLogin;