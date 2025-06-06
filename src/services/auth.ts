// src/services/auth.ts
import { googleProvider } from './firebase.ts';
import firebaseApp from './firebase.ts';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  Auth as FirebaseAuth,
  User,
  AuthProvider,
} from 'firebase/auth';

type AuthChangeCallback = (user: User | null) => void;

class Auth {
  private static instance: Auth;
  private auth: FirebaseAuth;

  private constructor() {
    this.auth = getAuth(firebaseApp);
  }

  static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  login(name: string) {
    const provider = this.getProvider(name);
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  onAuthChange(callback: AuthChangeCallback) {
    onAuthStateChanged(this.auth, (user) => {
      callback(user);
    });
  }

  private getProvider(name: string): AuthProvider {
    switch (name) {
      case 'Sign up with Google':
      case 'Login with Google':
        return googleProvider;
      default:
        throw new Error(`${name} is unknown provider.`);
    }
  }
}

const authInstance = Auth.getInstance();
export default authInstance;
