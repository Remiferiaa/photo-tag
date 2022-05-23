import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-KWz3ux23XtDVNrPDAbvG9ZwjTvu6p-8",
  authDomain: "photo-tag-50033.firebaseapp.com",
  projectId: "photo-tag-50033",
  storageBucket: "photo-tag-50033.appspot.com",
  messagingSenderId: "965569909537",
  appId: "1:965569909537:web:71000631da0b7c44aa6460"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }