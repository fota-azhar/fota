import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { firebaseApp } from ".";

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
