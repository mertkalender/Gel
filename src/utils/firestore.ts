import firestore from '@react-native-firebase/firestore';
import {COLLECTIONS} from '../constants/firebase';
import {Trip, TripStatus} from '../types/trip';
import {User} from '../types/user';
import {AttendanceRequest, Invitation} from '../types/trip';

export function createUser(
  _userId: string,
  _name: string,
  _surname: string,
  _email: string,
) {
  firestore()
    .collection(COLLECTIONS.USERS)
    .doc(_userId)
    .set({
      name: _name,
      surname: _surname,
      email: _email,
    })
    .catch(error => {
      console.log(error);
    });
}

export async function getUser(userId: string): Promise<User> {
  try {
    const documentSnapshot = await firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userId)
      .get();

    if (documentSnapshot.exists) {
      return {id: userId, ...documentSnapshot.data()} as User;
    } else {
      throw new Error('User does not exist!');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export function getUsers(userIDs: string[]): Promise<User[]> {
  return new Promise<User[]>((resolve, reject) => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.USERS)
      .where(firestore.FieldPath.documentId(), 'in', userIDs)
      .onSnapshot(
        querySnapshot => {
          const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as User[];
          resolve(users);
        },
        error => {
          console.error('Error fetching users:', error);
          reject(error);
        },
      );
    return unsubscribe;
  });
}

export async function getTrips(): Promise<Trip[]> {
  return new Promise<Trip[]>((resolve, reject) => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.TRIPS)
      .orderBy('date', 'desc')
      .onSnapshot(
        querySnapshot => {
          const trips = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Trip[];
          resolve(trips);
        },
        error => {
          console.error('Error fetching trips:', error);
          reject(error);
        },
      );
    return unsubscribe;
  });
}

export async function getTripByCreator(creatorID: string): Promise<Trip[]> {
  return new Promise<Trip[]>((resolve, reject) => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.TRIPS)
      .orderBy('date', 'desc')
      .where('creator', '==', creatorID)
      .onSnapshot(
        querySnapshot => {
          const trips = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Trip[];
          resolve(trips);
        },
        error => {
          console.error('Error fetching trips:', error);
          reject(error);
        },
      );
    return unsubscribe;
  });
}

export const createTrip = async (trip: Trip) => {
  try {
    await firestore().collection(COLLECTIONS.TRIPS).add(trip);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createAttendanceRequest = async (
  tripID: string,
  attendanceRequest: AttendanceRequest,
) => {
  try {
    await firestore()
      .collection(COLLECTIONS.TRIPS)
      .doc(tripID)
      .set(
        {
          attendanceRequests:
            firestore.FieldValue.arrayUnion(attendanceRequest),
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createInvitation = async (
  tripID: string,
  invitation: Invitation,
) => {
  try {
    await firestore()
      .collection(COLLECTIONS.TRIPS)
      .doc(tripID)
      .set(
        {
          invitations: firestore.FieldValue.arrayUnion(invitation),
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const acceptInvitation = async (trip: Trip, invitation: Invitation) => {
  try {
    const updatedInvitations = trip.invitations?.map(_invitation => {
      if (_invitation.inviterID === invitation.inviterID) {
        return {
          ..._invitation,
          status: invitation.status,
        };
      }
      return _invitation;
    });

    await firestore()
      .collection(COLLECTIONS.TRIPS)
      .doc(trip.id)
      .set(
        {
          invitations: firestore.FieldValue.arrayUnion({
            ...invitation,
          }),
          status: TripStatus.COMPLETED,
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const acceptAttendanceRequest = async (
  trip: Trip,
  attendanceRequest: AttendanceRequest,
) => {
  try {
    const updatedAttendanceRequests = trip.attendanceRequests?.map(request => {
      if (request.requesterID === attendanceRequest.requesterID) {
        return {
          ...request,
          status: attendanceRequest.status,
        };
      }
      return request;
    });

    await firestore()
      .collection(COLLECTIONS.TRIPS)
      .doc(trip.id)
      .set(
        {
          attendanceRequests: updatedAttendanceRequests,
          passengerCount: firestore.FieldValue.increment(1),
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const rejectAttendanceRequest = async (
  tripID: string,
  attendanceRequest: AttendanceRequest,
) => {
  try {
    await firestore()
      .collection(COLLECTIONS.TRIPS)
      .doc(tripID)
      .set(
        {
          attendanceRequests: firestore.FieldValue.arrayUnion({
            ...attendanceRequest,
          }),
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const rejectInvitation = async (
  tripID: string,
  invitation: Invitation,
) => {
  try {
    await firestore()
      .collection(COLLECTIONS.TRIPS)
      .doc(tripID)
      .set(
        {
          invitations: firestore.FieldValue.arrayUnion({
            ...invitation,
          }),
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};