import styled from 'styled-components/native';
import {fontSizes} from '../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import { colors } from '../../constants/colors';

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ListItemText = styled.Text`
  color: #fff;
  font-size: ${fontSizes.extraLarge}px;
`;

interface Props {
    title: string;
    onPress: () => void;
    iconName: string;
}

export const ProfileListItem = (props: Props) => {

  return (
    <ListItem onPress={() => props.onPress()}>
      <ListItemText>
        {props.title}
      </ListItemText>
      <Text>
        <Icon name={props.iconName} size={fontSizes.tabbarIcons} color={colors.white}/>
      </Text>
    </ListItem>
  );
};
