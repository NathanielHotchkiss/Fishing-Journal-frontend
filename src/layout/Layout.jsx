import { Fragment, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TokenService from "../services/token-service";
import { UserContext } from "../App";
import AuthApiService from "../services/auth-api-service";

import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  Cog8ToothIcon,
  HomeIcon,
  IdentificationIcon,
  ShoppingBagIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const userNavigation = [
  {
    name: "Settings",
    href: "/settings",
    icon: Cog8ToothIcon,
  },
];

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "New Log",
    href: "/new",
    icon: SquaresPlusIcon,
  },
  {
    name: "Species",
    href: "/species",
    icon: IdentificationIcon,
  },
  {
    name: "Tackle",
    href: "/tackle",
    icon: ShoppingBagIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Layout = ({ children, title }) => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const user_id = TokenService.getUserId();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { userInfo } = useContext(UserContext);
  const { first_name, last_name, email } = userInfo;

  useEffect(() => {
    return AuthApiService.getItem("app_users", user_id).then((res) =>
      context.setUserInfo(res)
    );
  }, []); // eslint-disable-line

  const user = `${first_name} ${last_name}`;

  function handleSignOut() {
    if (window.confirm("Are you sure you want to sign out?")) {
      TokenService.clearEverything();
      navigate("/");
    }
  }

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-zinc-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <h1 className="text-white text-3xl font-bold">
                      Fishing Log
                    </h1>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-zinc-300"
                              : "text-zinc-400 group-hover:text-zinc-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-700 p-3">
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm font-medium text-white">{user}</p>
                      <div className="text-sm font-medium text-gray-400">
                        {email}
                      </div>
                    </div>
                  </div>
                </div>
                <nav className="mt-2 flex-1 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-zinc-300"
                            : "text-zinc-400 group-hover:text-zinc-300",
                          "mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex">
                    <button
                      type="submit"
                      className="w-100 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white active:bg-zinc-900 active:text-white"
                      onClick={handleSignOut}
                    >
                      <ArrowRightOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-zinc-300" />
                      Sign out
                    </button>
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-zinc-800">
          <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white text-2xl font-bold">Fishing Journal</h1>
            </div>
            <nav className="mt-4 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-zinc-300"
                        : "text-zinc-400 group-hover:text-zinc-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-3">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-white">{user}</p>
                <div className="text-sm font-medium text-gray-400">{email}</div>
              </div>
            </div>
          </div>

          <nav className="mt-2 flex-1 px-2 space-y-1">
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  item.current
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-zinc-300"
                      : "text-zinc-400 group-hover:text-zinc-300",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
            <div className="flex">
              <button
                type="submit"
                className="w-100 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-700 hover:text-white active:bg-zinc-900 active:text-white"
                onClick={handleSignOut}
              >
                <ArrowRightOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-zinc-300" />
                Sign out
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-zinc-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">
              {title}
            </h1>
          </div>
        </header>
        <main className="flex-1">
          <div className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <main>{children}</main>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
