import styled from 'styled-components/native';
import { screenWidth } from '../../constants/generic';
import { ProfileListItem } from '../atom/ProfileListItem';
import { profileMenu } from '../../constants/generic';

const ListContainer = styled.View`
  background-color: #333;
  margin: 10px;
  border-radius: 10px;
  width: ${screenWidth * 0.95}px;
  justify-content: flex-start;
  flex: 5;
`;

const Divider = styled.View`
  borderBottomWidth: 1px;
  margin-horizontal: 2%;
`

export const ProfileList = ({ navigation } : any) => {

  return (
    <ListContainer>
      {profileMenu.map((item, index) => {
        return(
          <>
            <ProfileListItem key={index} title={item.title} onPress={() => navigation.navigate(item.navigationPage)} />
            <Divider/>
          </>
        )
      })}
    </ListContainer>
  );
};
