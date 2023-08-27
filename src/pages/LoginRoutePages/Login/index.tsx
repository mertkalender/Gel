import React, { useState } from 'react';
import { ButtonContainer, ButtonText, Container, Input, LoginBox, LoginButton, RegisterButton, Title } from './style';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../../store/slices/userSlice';


const PageLogin = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log(username, password);
  return (
      <Container>
        <LoginBox>
        <Title>Login</Title>
          <Input onChangeText={setUsername} placeholder="Username" />
          <Input onChangeText={setPassword} placeholder="Password" secureTextEntry />
          <ButtonContainer>
            <LoginButton onPress={() => dispatch(setIsLoggedIn(true))}>
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