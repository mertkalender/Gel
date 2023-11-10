export type Invitation = {
    inviterID: string;
    status: InvitationStatus;
};

export enum InvitationStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}