import { Text, Button} from 'react-native';
import { HomeContainer } from './style';

const PageHome = ({ navigation }) => {
  return (
    <HomeContainer>
      <Text>Hello React Native Navigation 👋</Text>

      <Button
        title="Push Settings Screen"
        color="#710ce3"
        onPress={() =>
          navigation.navigate('Details')
        }
      />
    </HomeContainer>
  );
};
PageHome.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
  bottomTab: {
    text: 'Home',
  },
};

export default PageHome;
