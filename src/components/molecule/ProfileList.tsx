import styled from 'styled-components/native';
import {screenWidth} from '../../constants/generic';
import {ProfileListItem} from '../atom/ProfileListItem';
import {getProfileMenu} from '../../constants/generic';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../store/slices/userSlice';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/colors';

const ListContainer = styled.View`
  background-color: ${colors.gray};
  margin: 10px;
  border-radius: 10px;
  width: ${screenWidth * 0.95}px;
  justify-content: flex-start;
  flex: 5;
`;

const Divider = styled.View`
  border-bottom-width: 1px;
  margin-horizontal: 2%;
  margin-left: 10%;
  border-bottom-color: ${colors.lightGray};
`;

export const ProfileList = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const _handleSignOut = async () => {
    await auth().signOut().then(() => {;
      dispatch(setIsLoggedIn(false));
    });
  }

  return (
    <ListContainer>
      {getProfileMenu().map((item, index) => {
        return (
          <Fragment key={index}>
            {item.title !== t('profile:logout') ? (
              <ProfileListItem
                rightIconName="chevron-forward-outline"
                leftIconName={item.leftIconName}
                title={item.title}
                onPress={() => navigation.navigate(item.navigationPage)}
                color={colors.white}
              />
            ) : (
              <ProfileListItem
                rightIconName="chevron-forward-outline"
                leftIconName={item.leftIconName}
                title={item.title}
                onPress={_handleSignOut}
                color={colors.red}
              />
            )}
            {index !== getProfileMenu().length - 1 ? <Divider /> : <></>}
          </Fragment>
        );
      })}
    </ListContainer>
  );
};
