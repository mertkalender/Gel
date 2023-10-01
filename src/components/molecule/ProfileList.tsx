import styled from 'styled-components/native';
import {screenWidth} from '../../constants/generic';
import {ProfileListItem} from '../atom/ProfileListItem';
import {profileMenu} from '../../constants/generic';
import {t} from 'i18next';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { Fragment } from 'react';

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

  const _handleSignOut = async () => {
    await auth().signOut().then(() => {;
      dispatch(setIsLoggedIn(false));
      Toast.show({
        type: 'success',
        text1: t('profile:logoutSuccess'),
        text2: t('profile:logoutSuccessMessage'),
        position: 'bottom',
      });
    });
  }

  return (
    <ListContainer>
      {profileMenu.map((item, index) => {
        return (
          <Fragment key={index}>
            {item.title !== t('profile:logout') ? (
              <ProfileListItem
                iconName="chevron-forward-outline"
                title={item.title}
                onPress={() => navigation.navigate(item.navigationPage)}
              />
            ) : (
              <ProfileListItem
                iconName="log-out-outline"
                title={item.title}
                onPress={_handleSignOut}
              />
            )}
            <Divider />
          </Fragment>
        );
      })}
    </ListContainer>
  );
};
