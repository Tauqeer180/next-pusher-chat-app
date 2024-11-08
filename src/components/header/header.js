"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { MyLink } from "../common/button";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import useUser from "@/Hooks/useUser";
import ProfileBtn from "./ProfileBtn";

const navigation = [
  { name: "Home", href: "/", current: true },
  {
    name: "Services",
    href: "/services",
    current: false,
    child: [
      {
        name: "Visa Consulting Services",
        href: "/services/visa-consulting",
      },
      {
        name: "IT Consulting Services",
        href: "/services/it-consulting",
      },
      {
        name: "Education Consulting Services",
        href: "/services/education-consulting",
      },
      {
        name: "Career Consulting Services",
        href: "/services/career-consulting",
      },
      {
        name: "Medical Consulting Services",
        href: "/services/medical-consulting",
      },
    ],
  },
  { name: "About", href: "/about", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Plans & Pricing", href: "#", current: false },
  // { name: "Tools & Tips", href: "#", current: false },
  { name: "Contact", href: "/contact", current: false },

  { name: "Appoinment", href: "/book-appoinment", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-primary">
      {({ open }) => (
        <>
          <div className=" max-w-7xl md:px-11 sm:px-8 px-4 mx-auto">
            <div className="relative flex h-[74px] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                  <Link href="/">
                    <h1 className="uppercase text-xl text-white">
                      Chat App
                    </h1>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/*  */}
                {/* Profile dropdown */}
                <ProfileBtn />
              </div>
            </div>
          </div>

          {/* Mobile Menu */}

          <MobileMenu data={navigation} />
        </>
      )}
    </Disclosure>
  );
}
