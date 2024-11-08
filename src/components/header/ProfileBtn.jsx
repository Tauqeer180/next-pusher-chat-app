"use client";
import useUser from "@/Hooks/useUser";
import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { MyLink } from "../common/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthContext";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProfileBtn() {
  const { logout, isAuthenticated, user } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      {isAuthenticated ? (
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative text-white flex items-center gap-2 rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-active focus:ring-offset-2 focus:ring-offset-primary">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Image
                width={50}
                height={50}
                className="h-8 w-8 rounded-full"
                src={`https://ui-avatars.com/api/?background=random&size=150&name=${
                  user?.fName + " " + user?.lName
                }`}
                alt=""
              />
              <span className=" hidden md:block">{user?.fName}</span>
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {user?.userType === 0 && (
              <>
                <MenuSection>
                  <MenuHeading className="px-4 text-sm text-gray-600 font-medium">
                    Dashboard
                  </MenuHeading>
                  <MenuSeparator className="my-1 h-px bg-gray-400" />
                  <MenuItem>
                    {({ focus }) => (
                      <Link
                        href="/dashboard/testimonials"
                        className={classNames(
                          focus ? "bg-gray-100" : "",
                          "block px-6 py-2 text-sm text-gray-500"
                        )}
                      >
                        Testimonials
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <Link
                        href="/dashboard/leads"
                        className={classNames(
                          focus ? "bg-gray-100" : "",
                          "block px-6 py-2 text-sm text-gray-500"
                        )}
                      >
                        Leads
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <Link
                        href="/dashboard/appointments"
                        className={classNames(
                          focus ? "bg-gray-100" : "",
                          "block px-6 py-2 text-sm text-gray-500"
                        )}
                      >
                        Appointments
                      </Link>
                    )}
                  </MenuItem>
                </MenuSection>
                <MenuSeparator className="my-1 h-px bg-gray-400" />
              </>
            )}
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={handleLogout}
                  className={classNames(
                    focus ? "bg-gray-100" : "",
                    "block text-start px-4 py-2 text-sm text-gray-700 w-full"
                  )}
                >
                  Sign out
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      ) : (
        <MyLink href="/login">Login</MyLink>
      )}
    </div>
  );
}
