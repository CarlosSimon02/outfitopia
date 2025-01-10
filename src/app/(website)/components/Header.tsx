import Image from "next/image";
import Link from "next/link";
import React from "react";

import { HeaderLink } from "@/app/(website)/components/HeaderLink";
import logo from "@/app/common/logo.svg";

export function Header() {
  return (
    <header
      className={
        "border-1 sticky top-0 z-10 flex h-[56px] w-full min-w-[100dvw] flex-row border-b border-surface-100 bg-white p-1 px-4"
      }
    >
      <div className={"flex flex-grow flex-row items-center gap-8"}>
        <Link href={"/"}>
          <Image className={"m-2"} src={logo} height={32} alt="Logo" />
        </Link>
        <HeaderLink href="/products">Products</HeaderLink>
        <HeaderLink href="/blog">Blog</HeaderLink>
      </div>
    </header>
  );
}
