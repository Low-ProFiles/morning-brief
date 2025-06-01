// src/service/auth.js
import {googleProvider} from './firebase'; 
import firebaseApp from './firebase';
import { getAuth, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";

class Auth {
    constructor() {
        if (!Auth.instance) {
            this.auth = getAuth(firebaseApp);
            Auth.instance = this;
        }
        return Auth.instance;
    }
    //구글에 로그인 요청을 한 뒤 해당 로그인 공급자(provider)를 가져와 로그인 시도
    login(name) {
        const provider = this.getProvider(name);
        return signInWithPopup(this.auth, provider);
    }
    //로그아웃 요청으로 현재 로그인된 사용자 세션을 종료
    logout() {
        return signOut(this.auth);
    }
    //로그인/로그아웃 상태가 바뀔 때마다 callback 함수 실행
    onAuthChange(callback) {
        onAuthStateChanged(this.auth, user => {
            callback(user);//null이면 로그아웃 상태, 값이 있으면 로그인 상태
        });
    }

    getProvider(name) {
        switch (name) {
            case "Sign up with Google":
                return googleProvider;
            case "Login with Google":
                return googleProvider;
            default:
                throw new Error(`${name} is unknown provider.`);
        }
    }
}
const authInstance = new Auth();
export default authInstance;