import React from 'react';
import { Container, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileInfoText } from './style';
import { ProfileList } from '../../../components/molecule/ProfileList';
import { ScrollView } from 'react-native';
import { useAppSelector } from '../../../store/store';

const PageProfile = ({ navigation }: any) => {

  const userData = useAppSelector(state => state.user.userData);
  return (
    <ScrollView>
      <Container>
        <ProfileInfo>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
          </ProfileImageContainer>
          <ProfileInfoText>{userData.name} {userData.surname}</ProfileInfoText>
        </ProfileInfo>
        <ProfileList navigation={navigation} />
      </Container>
    </ScrollView>
  );
}

export default PageProfile;