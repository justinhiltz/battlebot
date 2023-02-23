import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import avatarPlaceholder from "../../assets/img/justin-sm.png";

const TopBar = ({ user }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const signOut = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/user-sessions", {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const respBody = await response.json();
      setShouldRedirect(true);
      return { status: "ok" };
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  const unauthenticatedListItems = [
    <Fragment key="signed-out">
      <div>
        <Menu.Button className="flex rounded-full bg-rose-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-700">
          <span className="sr-only">Open user menu</span>
          <FontAwesomeIcon
            icon={faCircleUser}
            className="h-8 w-8 rounded-full text-yellow-500 hover:text-yellow-400"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="/user-sessions/new"
                className={classNames(
                  active ? "bg-rose-100" : "",
                  "block px-4 py-2 text-sm text-rose-700"
                )}
              >
                Sign In
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="/users/new"
                className={classNames(
                  active ? "bg-rose-100" : "",
                  "block px-4 py-2 text-sm text-rose-700"
                )}
              >
                Register
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Fragment>,
  ];

  const authenticatedListItems = [
    <Fragment key="signed-in">
      <div>
        <Menu.Button className="flex rounded-full bg-rose-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-700">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={avatarPlaceholder} alt="" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-rose-100" : "",
                  "block px-4 py-2 text-sm text-rose-700"
                )}
              >
                Your Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-rose-100" : "",
                  "block px-4 py-2 text-sm text-rose-700"
                )}
                onClick={signOut}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Fragment>,
  ];

  return (
    <Disclosure as="nav" className="bg-rose-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-rose-200 hover:bg-rose-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="block h-8 w-auto lg:hidden text-yellow-500"
                    title="Hip-Hop Battlebots"
                  />
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="hidden h-8 w-auto lg:block text-yellow-500"
                    title="Hip-Hop Battlebots"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-rose-900 text-white"
                            : "text-rose-200 hover:bg-rose-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {user ? authenticatedListItems : unauthenticatedListItems}
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-rose-900 text-white"
                      : "text-rose-300 hover:bg-rose-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const currentUrl = window.location.pathname;

const navigation = [
  { name: "Home", href: "/", current: currentUrl === "/" },
  { name: "Create New Battle", href: "/battles/new", current: currentUrl === "/battles/new" },
  { name: "Test Battle", href: "/battles/1", current: currentUrl === "/battles/1" },
  { name: "Rhyme", href: "/rhyme", current: currentUrl === "/rhyme" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default TopBar;
