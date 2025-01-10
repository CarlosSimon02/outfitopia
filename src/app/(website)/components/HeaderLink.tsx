"use client";

import { cls } from "@firecms/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type HeaderLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function HeaderLink({ href, children, className }: HeaderLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={cls(
        "block py-2 text-sm font-semibold uppercase hover:text-secondary dark:text-surface-300",
        isActive ? "text-secondary" : "text-surface-800",
        className,
      )}
    >
      {children}
    </Link>
  );
}
