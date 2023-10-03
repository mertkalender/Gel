import styled from 'styled-components/native';
import { fontSizes } from '../../../constants/fonts';
import {Picker} from '@react-native-picker/picker';
import { colors } from '../../../constants/colors';

export const SettingsContainer = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
`;

export const SettingsRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    marginBottom: 5px;
`;

export const SettingsItemText = styled.Text`
    font-size: 16px;
    color: ${colors.white};
`;

export const StyledPicker = styled(Picker)`
    width: 40%;
    height: 100%;
    background-color: transparent;
    color: ${colors.white};
`;
