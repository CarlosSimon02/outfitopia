import { useInitialiseFirebase } from "@firecms/firebase";

export const useFirebaseSetup = (firebaseConfig: Record<string, unknown>) => {
  return useInitialiseFirebase({
    firebaseConfig,
    name: "FireCMS",
  });
};
