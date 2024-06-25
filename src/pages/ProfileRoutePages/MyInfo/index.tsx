import React, { useState } from 'react';
import { Alert } from 'react-native';
import { getUser, updateUser } from '../../../utils/firestore';
import { ButtonText, Container, SaveButton, StyledTextInput } from './style';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../store/store';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slices/userSlice';

const PageMyInfo = ({ route, navigation }: any) => {

    const userData = useAppSelector(state => state.user.userData);

    const { t } = useTranslation();
    const [firstName, setFirstName] = useState(userData.name);
    const [lastName, setLastName] = useState(userData.surname);
    const dispatch = useDispatch();

    React.useLayoutEffect(() => {
        navigation.setOptions({ title: 'Edit Info' });
    }, [navigation]);

    const handleSave = async () => {
        try {
            await updateUser(userData.id as string, {
                name: firstName,
                surname: lastName,
            });
            const userInfo = await getUser(userData.id);
            dispatch(setUser(userInfo));    
            Toast.show({
                type: 'success',
                text1: t('generic:success'),
                text2: t('myInfo:myInfoUpdateSuccessMessage'),
            });
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert(t('generic:sthWrong'), t('generic:unknownError'));
        }
    };

    return (
        <Container>
            <StyledTextInput
                onChangeText={setFirstName}
                value={firstName}
            />
            <StyledTextInput
                onChangeText={setLastName}
                value={lastName}
            />
            <SaveButton onPress={handleSave}>
                <ButtonText>{t('generic:save')}</ButtonText>
            </SaveButton>
        </Container>
    );
};

export default PageMyInfo;
