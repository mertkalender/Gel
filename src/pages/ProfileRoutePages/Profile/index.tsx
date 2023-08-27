import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Container, ListContainer, ProfileInfo } from './style';

interface Trip {
  id: string;
  name: string;
}

interface Props {
  profilePicture: string;
  username: string;
  location: string;
  bio: string;
  trips: Trip[];
}

const PageProfile = ({ navigation }: any) => {

  return (
    <Container>
      <ProfileInfo>

      </ProfileInfo>
      <ListContainer>

      </ListContainer>
    </Container>
  );
}

export default PageProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 100,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
    color: 'gray',
  },
  bio: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  tripItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});