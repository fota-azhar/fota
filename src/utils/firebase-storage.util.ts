import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseStorage = getStorage(firebaseApp);

export const uploadFile = async ({
  file,
  onProgress,
  onComplete,
  onError,
}: {
  file: File;
  onProgress?: (progress: number) => void;
  onComplete?: (fileUrl: string) => void;
  onError?: (err: StorageError) => void;
}) => {
  const storageRef = ref(
    firebaseStorage,
    new Date().getTime() + "-" + file.name
  );

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress && onProgress(progress);
    },
    (error) => {
      if (onError) {
        return onError(error);
      }

      console.error("Failed to upload file");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        onComplete && onComplete(downloadURL);
      });
    }
  );
};
