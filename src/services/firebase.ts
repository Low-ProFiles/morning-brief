// src/service/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '../config/apiToken';

// Firebase 설정 객체 (환경 변수 사용)
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY as string,
  authDomain: FIREBASE_AUTH_DOMAIN as string,
  databaseURL: FIREBASE_DATABASE_URL as string,
  projectId: FIREBASE_PROJECT_ID as string,
  storageBucket: FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID as string,
  appId: FIREBASE_APP_ID as string,
  measurementId: FIREBASE_MEASUREMENT_ID as string,
};

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);

// 인증, DB, 제공자 객체들 export
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getDatabase(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export default firebaseApp;
