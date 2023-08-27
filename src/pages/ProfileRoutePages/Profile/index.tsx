import React from 'react';
import { Container, ProfileImage, ProfileImageContainer, ProfileInfo, ProfileInfoText } from './style';
import { ProfileList } from '../../../components/molecule/ProfileList';
import { ScrollView } from 'react-native';

const PageProfile = ({ navigation }: any) => {
  return (
    <ScrollView>
      <Container>
        <ProfileInfo>
          <ProfileImageContainer>
            <ProfileImage source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
          </ProfileImageContainer>
          <ProfileInfoText>Name Surname</ProfileInfoText>
        </ProfileInfo>
        <ProfileList navigation={navigation} />
      </Container>
    </ScrollView>
  );
}

export default PageProfile;