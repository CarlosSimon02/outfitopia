"use client";

import { SnackbarProvider } from "@firecms/core";
import React from "react";

export function Providers({ children }: React.PropsWithChildren): JSX.Element {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
