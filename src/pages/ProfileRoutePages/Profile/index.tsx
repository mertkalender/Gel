import { View, Text, Button } from "react-native";

const PageProfile = ({ navigation }: any) => {
    return (
      <View>
        <Text>Profile Screen</Text>
        <Button
        title="Push Settings Screen"
        color="#000000"
        onPress={() =>
          navigation.navigate('Settings')
        }
      />
      </View>
    );
}

export default PageProfile;