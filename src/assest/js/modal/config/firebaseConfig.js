// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBR0oDRKyJYjeh9J8t4FSxnbvh7AQMl5fc',
  authDomain: 'task-management-system-e5b5c.firebaseapp.com',
  projectId: 'task-management-system-e5b5c',
  storageBucket: 'task-management-system-e5b5c.appspot.com',
  messagingSenderId: '1042306871509',
  appId: '1:1042306871509:web:a140f0993266621178f25c',
  measurementId: 'G-7NKVEPC819',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
