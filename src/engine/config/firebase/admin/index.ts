import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { createFirebaseAdminApp } from "./adminApp";

export function formatFirebasePrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export const params = {
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const IS_USING_EMULATORS = false;
if (IS_USING_EMULATORS && process.env.NODE_ENV !== "production") {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "localhost:9199";
}

export function initializeAdmin() {
  return createFirebaseAdminApp(params);
}

export const adminFirestore = getFirestore(initializeAdmin());
export const adminAuth = getAuth(initializeAdmin());
