import { getDatabase, set, ref, push } from "firebase/database";
import { firebaseApp } from ".";

const database = getDatabase(firebaseApp);

export const createUpdate = (fileUrl: string) => {
  const updatesRef = ref(database, "updates");

  const newUpdateRef = push(updatesRef);

  return set(newUpdateRef, {
    fileUrl,
    someBooleanKey: false,
  });
};
