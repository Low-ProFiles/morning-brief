// src/service/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"; //추가
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
console.log("API KEY:", process.env.REACT_APP_API_KEY);



//Firebase 전체 앱을 초기화한 인스턴스
const firebaseApp = initializeApp(firebaseConfig);
//사용자 인증을 위한 객체, 로그인/로그아웃 시 사용
export const firebaseAuth = getAuth(firebaseApp);
//실시간 DB 객체
export const firebaseDB = getDatabase(firebaseApp);
//구글 아이디로 로그인하기 위한 인증 도구
export const googleProvider = new GoogleAuthProvider();
export default firebaseApp;
