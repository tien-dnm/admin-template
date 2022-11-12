import React, { Fragment, useCallback, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useTabPage } from "./services";
import { useAdminContext } from "../../global/context/admin";
import { useGlobalContext } from "../../global/context/global";
import { useLoading } from "../../global/custom_hooks/loading";
import { useTooltip } from "../../global/custom_hooks/tooltip";
import config from "../../global/config";
import { noImage } from "../../global/assets/img";
export default function HeaderNavbar() {
  const {
    setThemeColor,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isSidebarCollapsed_mobile,
    setIsSidebarCollapsed_mobile,
    setExpandedMenuID,
  } = useAdminContext();
  const Tab = useTabPage();
  const loading = useLoading();
  useTooltip();
  const { username, setUsername } = useGlobalContext();
  const logOut = useCallback(() => {
    Cookies.remove("username");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    Cookies.remove("expiration");
    setUsername(null);
  }, [setUsername]);
  const TabConfigDropDown = useMemo(
    () => [
      {
        text: "Tải lại tab",
        handler: () => {
          Tab.RefreshCurrent();
        },
      },
      {
        text: "Đóng tab hiện tại",
        handler: () => {
          Tab.CloseCurrent();
        },
      },
      {
        text: "Đóng tất cả tab",
        handler: () => {
          Tab.CloseAll();
        },
      },
      {
        text: "Đóng các tab khác",
        handler: () => {
          Tab.CloseOthers();
        },
      },
    ],
    [Tab]
  );
  const UserDropDown = useMemo(
    () => [
      {
        text: "Trang cá nhân",
        handler: null,
      },
      {
        text: "Cài đặt",
        handler: null,
      },
      {
        text: "Đăng xuất",
        handler: logOut,
      },
    ],
    [logOut]
  );

  const LoadMenuRole = useCallback(async () => {}, []);
  const toggleMobile = useCallback(
    (e) => {
      e.stopPropagation();
      setIsSidebarCollapsed(false);
      setIsSidebarCollapsed_mobile(!isSidebarCollapsed_mobile);
    },
    [
      isSidebarCollapsed_mobile,
      setIsSidebarCollapsed,
      setIsSidebarCollapsed_mobile,
    ]
  );
  const toggleMenu = useCallback(
    (e) => {
      e.stopPropagation();
      setIsSidebarCollapsed(!isSidebarCollapsed);
      if (!isSidebarCollapsed) {
        setExpandedMenuID(0);
      }
    },
    [isSidebarCollapsed, setIsSidebarCollapsed, setExpandedMenuID]
  );
  return useMemo(() => {
    return (
      <div
        className={` relative w-full flex justify-between border-b p-1 px-3 bg-white z-[11]`}
      >
        <div className="flex items-center z-[11]">
          <i
            onClick={toggleMenu}
            data-tip={isSidebarCollapsed ? `Mở rộng menu` : `Thu nhỏ menu`}
            data-place="bottom"
            className="fa-solid fa-bars text-black mr-2.5 cursor-pointer hidden lg:block"
          ></i>
          <i
            onClick={toggleMobile}
            className="fa-solid fa-bars text-black mr-2.5 cursor-pointer block lg:hidden"
          ></i>
          <i
            onClick={LoadMenuRole}
            data-tip={"Tải lại menu"}
            data-place="bottom"
            className="fa-solid fa-rotate-right text-black ml-2.5 cursor-pointer"
          ></i>
        </div>
        <div className="flex items-center z-[11]">
          <Menu as="div" className="ml-3 relative">
            <Menu.Button className="flex ">
              <i
                data-tip={"Tuỳ chỉnh tab"}
                data-place="bottom"
                className="fa-regular fa-window-flip mr-2.5 text-black"
              ></i>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                <Menu.Item disabled>
                  <Link
                    to={"#"}
                    className={
                      "block px-4 py-2 text-sm font-bold text-gray-700"
                    }
                  >
                    Tuỳ chỉnh tab
                  </Link>
                </Menu.Item>
                <div>
                  {TabConfigDropDown.map((item, index) => (
                    <Menu.Item key={index}>
                      <Link
                        to={"#"}
                        onClick={item.handler}
                        className={` block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300`}
                      >
                        {item.text}
                      </Link>
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu as="div" className="ml-3 relative">
            <Menu.Button className="flex ">
              <i
                data-tip={"Màu sắc"}
                data-place="bottom"
                className="fa-regular fa-swatchbook text-black mr-2.5"
              ></i>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="flex origin-top-right absolute right-0 mt-2 rounded-md shadow-lg p-3 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                {config.themelist.map((item, index) => (
                  <Menu.Item key={index}>
                    <Link
                      to={"#"}
                      onClick={() => {
                        setThemeColor(item);
                      }}
                      className={`cursor-pointer block px-4 py-2 text-sm  bg-${item} h-8 w-8 rounded ml-1 mr-1`}
                    ></Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu as="div" className="ml-3 relative">
            <Menu.Button className="bg-slate-800  flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <img className="w-7 h-7 rounded-full" src={noImage} alt="" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item disabled>
                  <Link
                    to={"#"}
                    className={
                      "block px-4 py-2 text-sm font-bold text-gray-700"
                    }
                  >
                    Xin chào {username}
                  </Link>
                </Menu.Item>
                {UserDropDown.map((item, index) => (
                  <Menu.Item key={index}>
                    <Link
                      to={"#"}
                      onClick={item.handler}
                      className={` block px-4 py-2 text-sm text-gray-700`}
                    >
                      {item.text}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    );
  }, [
    toggleMenu,
    isSidebarCollapsed,
    toggleMobile,
    LoadMenuRole,
    TabConfigDropDown,
    username,
    UserDropDown,
    setThemeColor,
  ]);
}
