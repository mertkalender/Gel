import styled from 'styled-components/native';
import {fontSizes} from '../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { profileListItemHeight } from '../../constants/generic';

interface ListItemTextProps {
  color: string;
}

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: ${profileListItemHeight}px;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListItemText = styled.Text<ListItemTextProps>`
  color: ${props => props.color};
  font-size: ${fontSizes.medium}px;
  margin-left: 10px;
`;

interface Props {
    title: string;
    onPress: () => void;
    rightIconName: string;
    leftIconName: string;
    color: string;
}

export const ProfileListItem = (props: Props) => {

  return (
    <ListItem onPress={() => props.onPress()}>
      <Left>
        <Icon name={props.leftIconName} size={fontSizes.tabbarIcons} color={props.color}/>
        <ListItemText color={props.color}>
          {props.title}
        </ListItemText>
      </Left>
      <Icon name={props.rightIconName} size={fontSizes.tabbarIcons} color={props.color}/>
    </ListItem>
  );
};
