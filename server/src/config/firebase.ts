import admin from "firebase-admin";
import serviceAccount from "./firebase_config.json";

if (!process.env.FIREBASE_STORAGE_BUCKET) {
  throw new Error("FIREBASE_STORAGE_BUCKET environment variable is not set");
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "gs://fitness-4d9e3.firebasestorage.app",
  });
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export const bucket = admin.storage().bucket();
export default admin;
