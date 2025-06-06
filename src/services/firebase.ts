// src/service/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase 설정 객체 (환경 변수 사용)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY as string,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN as string,
  databaseURL: process.env.REACT_APP_DATABASE_URL as string,
  projectId: process.env.REACT_APP_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET as string,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID as string,
  appId: process.env.REACT_APP_APP_ID as string,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID as string,
};

console.log("API KEY:", process.env.REACT_APP_API_KEY);

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);

// 인증, DB, 제공자 객체들 export
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getDatabase(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export default firebaseApp;
