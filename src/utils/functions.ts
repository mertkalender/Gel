import { Trip } from '../types/trip';
import { getTrips } from './firestore';

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

export const getGuestTrips = async (userID: string): Promise<Trip[]> => {
  try {
    const trips = await getTrips();
    const guestTrips = trips.filter(trip =>
      trip.attendanceRequests?.some(
        request =>
          request.requesterID === userID && request.status === 'accepted',
      ),
    );
    return guestTrips;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
