import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {COLLECTIONS} from '../constants/firebase';
import {Trip} from '../types/trip';
import {User} from '../types/user';
import {AttendanceRequest} from '../types/attendanceRequest';
import {useDispatch} from 'react-redux';
import {setTrips} from '../store/slices/tripsSlice';

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
      return documentSnapshot.data() as User;
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
