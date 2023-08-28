import styled from 'styled-components/native';
import {screenWidth} from '../../constants/generic';
import {ProfileListItem} from '../atom/ProfileListItem';
import {profileMenu} from '../../constants/generic';
import {t} from 'i18next';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../store/slices/userSlice';

const ListContainer = styled.View`
  background-color: #333;
  margin: 10px;
  border-radius: 10px;
  width: ${screenWidth * 0.95}px;
  justify-content: flex-start;
  flex: 5;
`;

const Divider = styled.View`
  borderbottomwidth: 1px;
  margin-horizontal: 2%;
`;

export const ProfileList = ({navigation}: any) => {
  const dispatch = useDispatch();
  return (
    <ListContainer>
      {profileMenu.map((item, index) => {
        return (
          <>
            {item.title !== t('profile:logout') ? (
              <ProfileListItem
                key={index}
                iconName="chevron-forward-outline"
                title={item.title}
                onPress={() => navigation.navigate(item.navigationPage)}
              />
            ) : (
              <ProfileListItem
                key={index}
                iconName="log-out-outline"
                title={item.title}
                onPress={() => dispatch(setIsLoggedIn(false))}
              />
            )}
            <Divider />
          </>
        );
      })}
    </ListContainer>
  );
};
