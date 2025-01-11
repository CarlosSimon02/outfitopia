import { blogCollection } from "../collections/blog";
import { productsCollection } from "../collections/products";
import {
  useBuildLocalConfigurationPersistence,
  useBuildModeController,
  useBuildNavigationController,
} from "@firecms/core";
import {
  type FirebaseAuthController,
  type FirebaseSignInProvider,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDelegate,
} from "@firecms/firebase";
import {
  useBuildUserManagement,
  userManagementAdminViews,
} from "@firecms/user_management";
import type { FirebaseApp } from "firebase/app";
import { useCallback } from "react";

export const useFireCMSControllers = (
  firebaseApp: FirebaseApp,
  signInOptions: FirebaseSignInProvider[],
) => {
  const modeController = useBuildModeController();

  const firestoreDelegate = useFirestoreDelegate({
    firebaseApp,
    localTextSearchEnabled: true,
  });

  const storageSource = useFirebaseStorageSource({
    firebaseApp,
  });

  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  const userManagement = useBuildUserManagement({
    dataSourceDelegate: firestoreDelegate,
    authController,
  });

  const userConfigPersistence = useBuildLocalConfigurationPersistence();

  const collectionsBuilder = useCallback(() => {
    return [productsCollection, blogCollection];
  }, []);

  const navigationController = useBuildNavigationController({
    collections: collectionsBuilder,
    adminViews: userManagementAdminViews,
    authController,
    dataSourceDelegate: firestoreDelegate,
  });

  return {
    modeController,
    firestoreDelegate,
    storageSource,
    userManagement,
    userConfigPersistence,
    navigationController,
  };
};
