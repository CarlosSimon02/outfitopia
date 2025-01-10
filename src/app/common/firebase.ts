import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";

import { firebaseConfig } from "@/infrastracture/firebase/client/firebaseConfig";

export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
