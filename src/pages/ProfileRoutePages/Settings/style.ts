import styled from 'styled-components/native';
import { colors } from '../../../constants/colors';

export const SettingsContainer = styled.View`
    flex: 1;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5%;
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
    color: ${colors.orange};
    flex: 1;
`;

export const PickerContainer = styled.View`
    flex: 2;
`;