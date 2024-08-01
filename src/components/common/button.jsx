"use client";
import React from "react";
import { cn } from "./constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Button({ children, className, ...rest }) {
  return (
    <button
      data-aos="fade-up"
      // data-aos-anchor-placement="bottom-center"
      {...rest}
      className={cn(
        className,
        `border border-primary px-12 py-[11px] duration-500 bg-white text-primary hover:bg-primary hover:text-white`
      )}
    >
      {children}
    </button>
  );
}

export const MyLink = ({ children, href, ...rest }) => {
  const path = usePathname();
  // console.log("Pathname  ", path);
  return (
    <>
      <Link
        {...rest}
        href={href}
        className={classNames(
          path == href
            ? " text-theme font-medium"
            : "text-white  hover:text-active",
          "rounded-md px-3 py-2 text-sm font-kode"
        )}
      >
        {children}
      </Link>
    </>
  );
};
