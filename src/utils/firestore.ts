import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { COLLECTIONS } from '../constants/firebase';

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
export function getUser( userId: string ) {
  useEffect(() => {
    const subscriber = firestore()
      .collection(COLLECTIONS.USERS)
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });
    return () => subscriber();
  }, [userId]);
}