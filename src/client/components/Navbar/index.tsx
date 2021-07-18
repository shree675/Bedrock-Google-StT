import Link from "next/link";
import { useGetCurrentUserQuery } from "../../graphql/getCurrentUser.generated";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { clearInterval } from "timers";

const tabs = [
  { name: "Dashboard", href: "/app", current: false },
  { name: "Profile", href: "/app/settings", current: false },
  { name: "Upgrade", href: "/", current: false },
  { name: "Feedback", href: "/app/feedback", current: false },
  // { name: "Logout", href: "/api/auth/logout", current: false },
];
 
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const [{ data }] = useGetCurrentUserQuery();
  // console.log(data?.currentUser?.profilepic);
  // const isAuthenticated = !!data?.currentUser;
  const isAuthenticated = "false";
  const [isloggedin, setStatus] = useState("false");
  const [profilepic, setProfilepic] = useState("");
  const [x, setX] = useState(0);
  // console.log(data?.currentUser);

  const logout = () => {
    setStatus("false");
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("name");
    localStorage.setItem("isloggedin", "false");
  };

  useEffect(() => {
    console.log(localStorage.getItem("isloggedin"));
    setStatus(localStorage.getItem("isloggedin"));
    const t = setInterval(() => {
      setStatus(localStorage.getItem("isloggedin"));
      setX(x + 1);

      // console.log(x);
      // if (localStorage.getItem("isloggedin") === "true") {
      //   clearInterval(t);
      // }
      if (x >= 3) {
        clearInterval(t);
      }
    }, 1000);
  }, [isloggedin]);

  return (
    <>
      {isloggedin === "false" ? null : (
        <div className="">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={tabs.filter((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200 bg-gray-100">
            <h1 className="font-bold ml-72 pt-4">XYZ</h1>
            <nav className="-mb-px flex space-x-8 mx-72" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-red-500 focus:border-blue-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Navbar;
