
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCpfgoR8aLHAszQCo2ifa4xiyoMikhBk8U",
    authDomain: "koinov3-dbaa9.firebaseapp.com",
    databaseURL: "https://koinov3-dbaa9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "koinov3-dbaa9",
    storageBucket: "koinov3-dbaa9.appspot.com",
    messagingSenderId: "427622516684",
    appId: "1:427622516684:web:a1b427bbd9a80a19117f69",
    measurementId: "G-H0FMFV9YF3"
};

firebase.initializeApp(firebaseConfig);

const CreateEventFormGoogle: React.FC = () => {
  const handleButtonClick = () => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        const googleFormUrl = 'https://forms.gle/gJkH9m6bHcMguMH17'; // Test form

        const openPopup = () => {
          const width = 600;
          const height = 600;
          const left = window.innerWidth / 2 - width / 2;
          const top = window.innerHeight / 2 - height / 2;

          window.open(
            googleFormUrl,
            '_blank',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
          );
        };

        openPopup();
      } else {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      }
    });
  };

  return (
    <button onClick={handleButtonClick}>
      Open Google Form
    </button>
  );
};

export default CreateEventFormGoogle;

