import { getDatabase, set, ref } from "firebase/database";
import { firebaseApp } from ".";
import { HexFile } from "../../types";

const database = getDatabase(firebaseApp);

export const createUpdate = (file: HexFile) => {
  const updateRef = ref(database, "test");

  return set(updateRef, {
    name: file.name,
    hex: file.content,
  });
};
