import { useDataEnhancementPlugin } from "@firecms/data_enhancement";
import { useExportPlugin } from "@firecms/data_export";
import { useImportPlugin } from "@firecms/data_import";
import { type FirebaseUserWrapper } from "@firecms/firebase";
import type { UserManagement } from "@firecms/user_management";
import { useUserManagementPlugin } from "@firecms/user_management";

export const useFireCMSPlugins = (
  userManagement: UserManagement<FirebaseUserWrapper>,
) => {
  const dataEnhancementPlugin = useDataEnhancementPlugin({
    getConfigForPath: ({ path }) => path === "products",
  });

  const userManagementPlugin = useUserManagementPlugin({ userManagement });
  const importPlugin = useImportPlugin();
  const exportPlugin = useExportPlugin();

  return [
    dataEnhancementPlugin,
    importPlugin,
    exportPlugin,
    userManagementPlugin,
  ];
};
