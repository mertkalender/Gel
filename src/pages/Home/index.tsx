import { View, Text, Button } from "react-native";
import { Navigation } from "react-native-navigation";

const PageHome = (props: any) => {
    return (
        <View>
        <Text>Hello React Native Navigation 👋</Text>

        <Button
            title='Push Settings Screen'
            color='#710ce3'
            onPress={() => Navigation.push(props.componentId, {
            component: {
                name: 'Settings'
            }
            })} />
        </View>
    );
};
PageHome.options = {
    topBar: {
        title: {
        text: 'Home'
        }
    },
    bottomTab: {
        text: 'Home'
    }
};

export default PageHome;

  