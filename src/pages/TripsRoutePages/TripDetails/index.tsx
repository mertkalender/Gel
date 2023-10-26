import React from 'react';
import { ButtonText, Container, DestinationRow, DestinationText, InfoLabel, InfoRow, StyledButton } from './style';
import { useTranslation } from 'react-i18next';
import { Trip } from '../../../types/trip';

export const PageTripDetails = ({route, navigation}: any) => {
    const trip : Trip = route.params.trip;
    const { t } = useTranslation();
    return (
        <Container>
            <DestinationRow>
                <DestinationText>{trip.startPoint}</DestinationText>
                <DestinationText>{'--------------->'}</DestinationText>
                <DestinationText>{trip.endPoint}</DestinationText>
            </DestinationRow>
            <InfoRow>
                <InfoLabel>{t(`trips:passengerCount`)}</InfoLabel>
                <InfoLabel>{trip.passengerCount}</InfoLabel>
            </InfoRow>
            <InfoRow>
                <InfoLabel>{t(`trips:creator`)}</InfoLabel>
                <InfoLabel>{trip.creator}</InfoLabel>
            </InfoRow>
            <InfoRow>
                <InfoLabel>{t(`trips:passengerCount`)}</InfoLabel>
                <InfoLabel>{trip.passengerCount}</InfoLabel>
            </InfoRow>
            <StyledButton>
                <ButtonText>{trip.isCreatorDriver ? 'Request to Attend' : 'Invite to your car'}</ButtonText>
            </StyledButton>
        </Container>
    );
};