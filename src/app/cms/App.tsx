"use client";

import {
  CircularProgressCenter,
  FireCMS,
  ModeControllerProvider,
  SnackbarProvider,
  useValidateAuthenticator,
} from "@firecms/core";
import type { FirebaseSignInProvider } from "@firecms/firebase";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono";
import "typeface-rubik";

import { LoginView } from "./components/LoginView";
import { MainLayout } from "./components/MainLayout";
import { useFireCMSControllers } from "./hooks/useFireCMSControllers";
import { useFireCMSPlugins } from "./hooks/useFireCMSPlugins";
import { useFirebaseSetup } from "./hooks/useFirebaseSetup";
import "@/app/common/index.css";
import logo from "@/app/common/logo.svg";
import { firebaseConfig } from "@/infrastracture/firebase/client/firebaseConfig";

export function App() {
  const title = "Outfitopia";
  const signInOptions: FirebaseSignInProvider[] = ["google.com", "password"];

  if (!firebaseConfig?.projectId) {
    throw new Error(
      "Firebase config not found. Please check your `firebaseConfig.ts` file.",
    );
  }

  const { firebaseApp, firebaseConfigLoading, configError } =
    useFirebaseSetup(firebaseConfig);

  const {
    modeController,
    firestoreDelegate,
    storageSource,
    userManagement,
    userConfigPersistence,
    navigationController,
  } = useFireCMSControllers(firebaseApp!, signInOptions);

  const plugins = useFireCMSPlugins(userManagement);

  const { authLoading, canAccessMainView, notAllowedError } =
    useValidateAuthenticator({
      authController: userManagement,
      disabled: userManagement.loading,
      authenticator: userManagement.authenticator,
      dataSourceDelegate: firestoreDelegate,
      storageSource,
    });

  if (firebaseConfigLoading || !firebaseApp) {
    return <CircularProgressCenter />;
  }

  if (configError) {
    return <>{configError}</>;
  }

  return (
    <SnackbarProvider>
      <ModeControllerProvider value={modeController}>
        <FireCMS
          navigationController={navigationController}
          authController={userManagement}
          userConfigPersistence={userConfigPersistence}
          dataSourceDelegate={firestoreDelegate}
          storageSource={storageSource}
          plugins={plugins}
        >
          {({ loading }) => {
            if (loading || authLoading) {
              return <CircularProgressCenter size={"large"} />;
            }

            if (!canAccessMainView) {
              return (
                <LoginView
                  logo={logo.src}
                  firebaseApp={firebaseApp}
                  signInOptions={signInOptions}
                  userManagement={userManagement}
                  notAllowedError={notAllowedError}
                />
              );
            }

            return <MainLayout logo={logo.src} title={title} />;
          }}
        </FireCMS>
      </ModeControllerProvider>
    </SnackbarProvider>
  );
}
