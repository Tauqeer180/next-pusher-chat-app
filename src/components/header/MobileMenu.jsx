import {
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function MobileMenu({ data }) {
  const path = usePathname();

  return (
    <div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {data.map((item, ind) => (
            <>
              {item?.child?.length > 0 ? (
                <div key={ind}>
                  <Menu
                    key={ind}
                    data-open={true}
                    open={true}
                    as="div"
                    className="relative w-full"
                  >
                    {({ open }) => (
                      <>
                        <MenuButton
                          className={`${
                            open
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } 
                                block rounded-md px-3 py-2 text-base font-medium w-full 
                              `}
                        >
                          {/* <span className="absolute -inset-1.5" /> */}
                          <span className="flex items-center gap-1">
                            <span className="">{item?.name}</span>
                            <ChevronDownIcon
                              className={`${
                                open
                                  ? "transition-transform -rotate-180 duration-500"
                                  : "transition-transform  duration-500"
                              } font-extrabold h-5 w-3 `}
                            />
                          </span>
                        </MenuButton>

                        <MenuItems
                          transition
                          className=" ml-10 divide-y-2 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-500 data-[leave]:duration-500 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          {item?.child?.map((ch, i) => {
                            return (
                              <MenuItem key={i}>
                                {({ focus }) => (
                                  <a
                                    href={ch?.href}
                                    className={classNames(
                                      focus || path == ch?.href
                                        ? "bg-gray-300"
                                        : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {ch?.name}
                                  </a>
                                )}
                              </MenuItem>
                            );
                          })}
                        </MenuItems>
                      </>
                    )}
                  </Menu>
                </div>
              ) : (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    path == item?.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={path == item?.href ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              )}{" "}
            </>
          ))}
        </div>
      </DisclosurePanel>
    </div>
  );
}
