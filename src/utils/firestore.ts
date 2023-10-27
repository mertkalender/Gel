import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { COLLECTIONS } from '../constants/firebase';
import { Trip } from '../types/trip';
import { User } from '../types/user';

export function createUser( _userId: string, _name: string, _surname: string, _email: string ) {
    firestore()
    .collection(COLLECTIONS.USERS)
    .doc(_userId).set({
        name: _name,
        surname: _surname,
        email: _email,
    }).catch((error) => {
        console.log(error);
    });
}

export async function getUser(userId: string): Promise<User> {
    try {
      const documentSnapshot = await firestore().collection(COLLECTIONS.USERS).doc(userId).get();
  
      if (documentSnapshot.exists) {
        return documentSnapshot.data() as User;
      } else {
        throw new Error('User does not exist!');    }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}

export const getTrips = async () => {
    try {
        const querySnapshot = await firestore().collection(COLLECTIONS.TRIPS).get();
        if (querySnapshot.empty) {
            return []; // Return an empty array if there are no documents
        }
        const trips = querySnapshot.docs.map((doc) => doc.data());
        return trips; // Return the array of trips
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
    
export const createTrip = async (trip: Trip) => {
    try {
        await firestore().collection(COLLECTIONS.TRIPS).add(trip);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}