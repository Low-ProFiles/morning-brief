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
    apiKey: "AIzaSyB1DTREMSBE63e6UfCLPxbvxPFVxQw3OW4",
    authDomain: "morning-brief-adbcd.firebaseapp.com",
    databaseURL: "https://morning-brief-adbcd-default-rtdb.firebaseio.com",
    projectId: "morning-brief-adbcd",
    storageBucket: "morning-brief-adbcd.firebasestorage.app",
    messagingSenderId: "15618679194",
    appId: "1:15618679194:web:10fe4101344552cef05a23",
    measurementId: "G-T6WMGKPRQD"
};


//Firebase 전체 앱을 초기화한 인스턴스
const firebaseApp = initializeApp(firebaseConfig);
//사용자 인증을 위한 객체, 로그인/로그아웃 시 사용
export const firebaseAuth = getAuth(firebaseApp);
//실시간 DB 객체
export const firebaseDB = getDatabase(firebaseApp);
//구글 아이디로 로그인하기 위한 인증 도구
export const googleProvider = new GoogleAuthProvider();
export default firebaseApp;
