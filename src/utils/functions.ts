import { Trip } from '../types/trip';

export function capitalize(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}

export function isAlreadyRequested(trip: Trip, userId: string,): boolean  {
  if(trip.isCreatorDriver){
    return trip.attendanceRequests?.some(request => request.requesterID === userId) as boolean;
  }
  else{
    return trip.invitations?.some(invitation => invitation.inviterID === userId) as boolean;
  }
}
