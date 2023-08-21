import { View, Text } from "react-native";

const PageSettings = () => {
    return (
      <View>
        <Text>Settings Screen</Text>
      </View>
    );
}
PageSettings.options = {
    topBar: {
      title: {
        text: 'Settings'
      }
    },
    bottomTab: {
      text: 'Settings'
    }
}

export default PageSettings;