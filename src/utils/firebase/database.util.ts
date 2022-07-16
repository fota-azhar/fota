import { getDatabase, set, ref, push } from "firebase/database";
import { firebaseApp } from ".";
import { HexFile } from "../../types";

const database = getDatabase(firebaseApp);

export const createUpdate = (file: HexFile) => {
  const updatesRef = ref(database, "updates");

  const newUpdateRef = push(updatesRef);

  return set(newUpdateRef, {
    name: file.name,
    content: file.content,
  });
};
