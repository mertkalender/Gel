import firestore from '@react-native-firebase/firestore';
import {COLLECTIONS} from '../constants/firebase';
import {Trip, TripStatus} from '../types/trip';
import {User} from '../types/user';
import {AttendanceRequest, Invitation} from '../types/trip';
import {setTrips} from '../store/slices/tripsSlice';
import {generateEmailVerificationHTML} from '../assets/email/email-verification';

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
      console.error('Error:', error);
    });
}

export function updateUser(userId: string, updatedUser: Partial<User>) {
  firestore()
    .collection(COLLECTIONS.USERS)
    .doc(userId)
    .set(updatedUser, {merge: true})
    .catch(error => {
      console.error('Error:', error);
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

export async function getTrips(dispatch: any) {
  firestore()
    .collection(COLLECTIONS.TRIPS)
    .where('status', '==', TripStatus.ACTIVE)
    .orderBy('date', 'desc')
    .onSnapshot(
      querySnapshot => {
        const trips = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Trip[];
        dispatch(setTrips(trips));
      },
      error => {
        console.error('Error fetching trips:', error);
      },
    );
}

export async function getTripById(tripID: string): Promise<Trip> {
  return new Promise<Trip>((resolve, reject) => {
    const unsubscribe = firestore()
      .collection(COLLECTIONS.TRIPS)
      .doc(tripID)
      .onSnapshot(
        querySnapshot => {
          const trip = querySnapshot.data() as Trip;
          resolve(trip);
        },
        error => {
          console.error('Error fetching trip:', error);
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

export const deleteTrip = async (tripID: string) => {
  try {
    await firestore().collection(COLLECTIONS.TRIPS).doc(tripID).set(
      {
        status: TripStatus.CANCELLED,
      },
      {merge: true},
    );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const updateTrip = async (tripID: string, updatedTrip: Partial<Trip>) => {
  try {
    await firestore().collection(COLLECTIONS.TRIPS).doc(tripID).set(updatedTrip, {merge: true});
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

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

    await firestore().collection(COLLECTIONS.TRIPS).doc(trip.id).set(
      {
        invitations: updatedInvitations,
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
          passengers: firestore.FieldValue.arrayUnion(
            attendanceRequest.requesterID,
          ),
        },
        {merge: true},
      );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const rejectAttendanceRequest = async (
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

    await firestore().collection(COLLECTIONS.TRIPS).doc(trip.id).set(
      {
        attendanceRequests: updatedAttendanceRequests,
      },
      {merge: true},
    );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const rejectInvitation = async (trip: Trip, invitation: Invitation) => {
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

    await firestore().collection(COLLECTIONS.TRIPS).doc(trip.id).set(
      {
        invitations: updatedInvitations,
      },
      {merge: true},
    );
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const sendVerificationEmail = async (
  receiver: string,
  verificationCode: string,
  receiverName: string,
) => {
  try {
    await firestore()
      .collection(COLLECTIONS.EMAIL)
      .add({
        to: [receiver],
        message: {
          subject: `GEL Verification - ${verificationCode}`,
          html: generateEmailVerificationHTML({verificationCode, receiverName}),
        },
      });
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export async function unsubscribeAll() {
  await firestore()
    .collection(COLLECTIONS.USERS)
    .onSnapshot(() => {});
  await firestore()
    .collection(COLLECTIONS.TRIPS)
    .onSnapshot(() => {});
}
