import {
  AppBar,
  Drawer,
  NavigationRoutes,
  Scaffold,
  SideDialogs,
} from "@firecms/core";
import { Button, OpenInNewIcon } from "@firecms/ui";
import Link from "next/link";

interface MainLayoutProps {
  logo: string;
  title: string;
}

export const MainLayout = ({ logo, title }: MainLayoutProps) => {
  return (
    <Scaffold logo={logo} autoOpenDrawer={false}>
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
};
