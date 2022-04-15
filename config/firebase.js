import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgT7xPEad-BoN--D8ZAOl5ur3Wl2iIHG8",
  authDomain: "fibonacciku-18bb2.firebaseapp.com",
  projectId: "fibonacciku-18bb2",
  storageBucket: "fibonacciku-18bb2.appspot.com",
  messagingSenderId: "171750039286",
  appId: "1:171750039286:web:eb16144aff3a56567196d7",
  measurementId: "G-3T3SMC2FD4",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
