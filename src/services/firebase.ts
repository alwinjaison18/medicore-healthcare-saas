import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  isSupported as analyticsIsSupported,
  type Analytics,
} from "firebase/analytics";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPI7-9ctpVzp9if1U2KjM6qwQYQKOmnx4",
  authDomain: "medicore-df32d.firebaseapp.com",
  projectId: "medicore-df32d",
  storageBucket: "medicore-df32d.firebasestorage.app",
  messagingSenderId: "333237608820",
  appId: "1:333237608820:web:3681a2a0fdf5baf2264c21",
  measurementId: "G-430GN91R4F",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export let analytics: Analytics | null = null;

if (typeof window !== "undefined") {
  void analyticsIsSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export const authPersistenceReady = setPersistence(
  auth,
  browserLocalPersistence,
);
