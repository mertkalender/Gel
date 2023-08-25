import { View, Text } from "react-native";

const PageProfile = () => {
    return (
      <View>
        <Text>Profile Screen</Text>
      </View>
    );
}
PageProfile.options = {
    topBar: {
      title: {
        text: 'Settings'
      }
    },
    bottomTab: {
      text: 'Settings'
    }
}

export default PageProfile;