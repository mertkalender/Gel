import { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';

export class Timestamp extends firebase.firestore.Timestamp {}

export enum TripStatus {
    ACTIVE = 'ACTIVE',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
    PAST = 'PAST',
}

export enum RequestStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export type Trip = {
    id?: string;
    creator: string;
    startPoint: string;
    endPoint: string;
    date: FirebaseFirestoreTypes.Timestamp;
    passengerCount: number;
    passengers: string[];
    isCreatorDriver: boolean;
    attendanceRequests?: AttendanceRequest[];
    invitations?: Invitation[];
    status: TripStatus;
};

export type Invitation = {
    inviterID: string;
    status: RequestStatus;
};

export type AttendanceRequest = {
    requesterID: string;
    status: RequestStatus;
};