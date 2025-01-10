"use client";

import {
  AppBar,
  CircularProgressCenter,
  Drawer,
  FireCMS,
  ModeControllerProvider,
  NavigationRoutes,
  Scaffold,
  SideDialogs,
  SnackbarProvider,
  useBuildLocalConfigurationPersistence,
  useBuildModeController,
  useBuildNavigationController,
  useValidateAuthenticator,
} from "@firecms/core";
import { useDataEnhancementPlugin } from "@firecms/data_enhancement";
import { useExportPlugin } from "@firecms/data_export";
import { useImportPlugin } from "@firecms/data_import";
import {
  type FirebaseAuthController,
  FirebaseLoginView,
  type FirebaseSignInProvider,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDelegate,
  useInitialiseFirebase,
} from "@firecms/firebase";
import { Button, OpenInNewIcon } from "@firecms/ui";
import {
  useBuildUserManagement,
  useUserManagementPlugin,
  userManagementAdminViews,
} from "@firecms/user_management";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono";
import Link from "next/link";
import { useCallback } from "react";
import "typeface-rubik";

import { productsCollection } from "./collections/products";
import { blogCollection } from "@/app/cms/collections/blog";
import "@/app/common/index.css";
import logo from "@/app/common/logo.svg";
import { firebaseConfig } from "@/infrastracture/firebase/client/firebaseConfig";

export function App() {
  const title = "FireCMS e-commerce and blog demo";

  if (!firebaseConfig?.projectId) {
    throw new Error(
      "Firebase config not found. Please check your `firebase_config.ts` file and make sure it is correctly set up.",
    );
  }

  const { firebaseApp, firebaseConfigLoading, configError } =
    useInitialiseFirebase({
      firebaseConfig,
      name: "FireCMS",
    });

  const collectionsBuilder = useCallback(() => {
    return [productsCollection, blogCollection];
  }, []);

  // // Here you define your custom top-level views
  // const views: CMSView[] = useMemo(() => ([{
  //     path: "example",
  //     name: "Example CMS view",
  //     view: <ExampleCMSView/>
  // }]), []);

  const signInOptions: FirebaseSignInProvider[] = ["google.com", "password"];

  /**
   * Controller used to manage the dark or light color mode
   */
  const modeController = useBuildModeController();

  /**
   * Delegate used for fetching and saving data in Firestore
   */
  const firestoreDelegate = useFirestoreDelegate({
    firebaseApp,
    localTextSearchEnabled: true,
  });

  /**
   * Controller used for saving and fetching files in storage
   */
  const storageSource = useFirebaseStorageSource({
    firebaseApp,
  });

  /**
   * Controller for managing authentication
   */
  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });
  /**
   * Controller in charge of user management
   */
  const userManagement = useBuildUserManagement({
    dataSourceDelegate: firestoreDelegate,
    authController,
  });

  /**
   * Controller for saving some user preferences locally.
   */
  const userConfigPersistence = useBuildLocalConfigurationPersistence();

  /**
   * Use the authenticator to control access to the main view
   */
  const { authLoading, canAccessMainView, notAllowedError } =
    useValidateAuthenticator({
      authController: userManagement,
      disabled: userManagement.loading,
      authenticator: userManagement.authenticator, // you can define your own authenticator here
      dataSourceDelegate: firestoreDelegate,
      storageSource,
    });

  const navigationController = useBuildNavigationController({
    collections: collectionsBuilder,
    // collectionPermissions: userManagement.collectionPermissions, // TODO: enable this
    // views,
    adminViews: userManagementAdminViews,
    authController,
    dataSourceDelegate: firestoreDelegate,
  });

  /**
   * Data enhancement plugin
   */
  const dataEnhancementPlugin = useDataEnhancementPlugin({
    getConfigForPath: ({ path }) => {
      if (path === "products") return true;
      return false;
    },
  });

  /**
   * User management plugin
   */
  const userManagementPlugin = useUserManagementPlugin({ userManagement });

  /**
   * Allow import and export data plugin
   */
  const importPlugin = useImportPlugin();
  const exportPlugin = useExportPlugin();

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
          plugins={[
            dataEnhancementPlugin,
            importPlugin,
            exportPlugin,
            userManagementPlugin,
          ]}
        >
          {({ loading }) => {
            let component;
            if (loading || authLoading) {
              component = <CircularProgressCenter size={"large"} />;
            } else {
              if (!canAccessMainView) {
                component = (
                  <div
                    className={
                      "h-fit w-full max-w-[500px] rounded-2xl bg-white"
                    }
                  >
                    <FirebaseLoginView
                      logo={logo.src}
                      allowSkipLogin={true}
                      signInOptions={signInOptions}
                      firebaseApp={firebaseApp}
                      authController={userManagement}
                      notAllowedError={notAllowedError}
                    />
                  </div>
                );
              } else {
                component = (
                  <Scaffold logo={logo.src} autoOpenDrawer={false}>
                    <AppBar
                      title={title}
                      endAdornment={
                        <Link href={"/"} target={"_blank"}>
                          <Button variant={"text"}>
                            <OpenInNewIcon />
                            Go to website
                          </Button>
                        </Link>
                      }
                    />
                    <Drawer />
                    <NavigationRoutes />
                    <SideDialogs />
                  </Scaffold>
                );
              }
            }

            return component;
          }}
        </FireCMS>
      </ModeControllerProvider>
    </SnackbarProvider>
  );
}
