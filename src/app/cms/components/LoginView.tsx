import type {
  FirebaseAuthController,
  FirebaseSignInProvider,
} from "@firecms/firebase";
import { FirebaseLoginView } from "@firecms/firebase";
import type { FirebaseApp } from "firebase/app";

interface LoginViewProps {
  logo: string;
  firebaseApp: FirebaseApp;
  signInOptions: FirebaseSignInProvider[];
  userManagement: FirebaseAuthController;
  notAllowedError?: string;
}

export const LoginView = ({
  logo,
  firebaseApp,
  signInOptions,
  userManagement,
  notAllowedError,
}: LoginViewProps) => {
  return (
    <div className="h-fit w-full max-w-[500px] rounded-2xl bg-white">
      <FirebaseLoginView
        logo={logo}
        allowSkipLogin={true}
        signInOptions={signInOptions}
        firebaseApp={firebaseApp}
        authController={userManagement}
        notAllowedError={notAllowedError}
      />
    </div>
  );
};
