export type AttendanceRequest = {
    requesterID: string;
    status: AttendanceStatus;
};

export enum AttendanceStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}