"use client";

import { App } from "../App";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

export function CMSRoute() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <BrowserRouter basename={"/cms"}>
      <App />
    </BrowserRouter>
  );
}
