import { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { AttendanceRequest } from './attendanceRequest';

export class Timestamp extends firebase.firestore.Timestamp {}

export type Trip = {
    id?: string;
    creator: string;
    startPoint: string;
    endPoint: string;
    date: FirebaseFirestoreTypes.Timestamp;
    passengerCount: number;
    isCreatorDriver: boolean;
    attendanceRequests: AttendanceRequest[];
};
