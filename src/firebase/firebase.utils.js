// {
//     apiKey: "AIzaSyBpxaY6s0lbTPvrPW2Zh_3lAwClNtM58EI",
//     authDomain: "puru-music-3e2b2.firebaseapp.com",
//     projectId: "puru-music-3e2b2",
//     storageBucket: "puru-music-3e2b2.appspot.com",
//     messagingSenderId: "833523097298",
//     appId: "1:833523097298:web:4556359775030de99c970b",
//     measurementId: "G-6FKXCXRTJL"
//   };

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBpxaY6s0lbTPvrPW2Zh_3lAwClNtM58EI",
    authDomain: "puru-music-3e2b2.firebaseapp.com",
    projectId: "puru-music-3e2b2",
    storageBucket: "puru-music-3e2b2.appspot.com",
    messagingSenderId: "833523097298",
    appId: "1:833523097298:web:4556359775030de99c970b",
    measurementId: "G-6FKXCXRTJL"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error created',error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;