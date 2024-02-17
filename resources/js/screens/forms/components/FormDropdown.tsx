import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import {
//   ArchiveBoxIcon,
//   ArrowRightCircleIcon,
//   DocumentDuplicateIcon,
//   HeartIcon,
//   TrashIcon,
//   UserPlusIcon,
// } from "@heroicons/react/20/solid";

import type { FormDropdownItem } from "@/shared.types";
import { icons } from "@/ui";

interface FormDropdownProps {
    mode: "FORM" | "USERS";
    items: FormDropdownItem[];
    param?: string | number;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const buildHref = (mode: string, itemName: string, param?: string | number) => {
    if (mode === "USERS") {
        switch (itemName) {
            case "Edit":
                return `/users/${param}`;
            case "Delete":
                return `/users/${param}/delete`;
            case "Duplicate":
                return `/users/${param}/duplicate`;
            case "Archive":
                return `/users/${param}/archive`;
            case "Move":
                return `/users/${param}/move`;
            case "Share":
                return `/users/${param}/share`;
            case "Add to favorites":
                return `/users/${param}/add-to-favorites`;
        }
    } // mode === "FORM"
    else {
        switch (itemName) {
            case "Edit":
                return `/forms/${param}`;
            case "Duplicate":
                return `/forms/${param}/duplicate`;
        }
    }
};

export const FormDropdown: React.FC<FormDropdownProps> = ({
    items,
    mode,
    param,
}) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex">
                    <icons.ThreeDotsIcon />
                    {/* <icons.EllipsisHorizontalIcon /> */}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-[-15px] max-h-[300px] w-56 origin-top-right divide-y divide-gray-100 overflow-scroll rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {items.map((item, idx) =>
                        item.newSection ?? idx === 0 ? (
                            <div key={idx} className="py-1">
                                <Menu.Item key={idx}>
                                    {({ active }) => (
                                        <a
                                            href={buildHref(mode, item.name, param)}
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "group flex items-center px-4 py-2 text-sm",
                                            )}
                                        >
                                            {/* {React.cloneElement(item.icon, {
                                                className:
                                                    "mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500",
                                                "aria-hidden": "true",
                                            })} */}
                                            {item.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        ) : (
                            <Menu.Item key={idx}>
                                {({ active }) => (
                                    <a
                                        href={buildHref(mode, item.name, param)}
                                        className={classNames(
                                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                            "group flex items-center px-4 py-2 text-sm",
                                        )}
                                    >
                                        {/* {React.cloneElement(item.icon, {
                                            className:
                                                "mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500",
                                            "aria-hidden": "true",
                                        })} */}
                                        {item.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ),
                    )}
                    {/* <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#f"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <PencilIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Edit
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#f"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <DocumentDuplicateIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Duplicate
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#f"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArchiveBoxIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Archive
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#f"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArrowRightCircleIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Move
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#f"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <UserPlusIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Share
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#f"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HeartIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Add to favorites
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#f"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <TrashIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Delete
                </a>
              )}
            </Menu.Item>
          </div> */}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default FormDropdown;
