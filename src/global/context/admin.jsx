import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { useGlobalContext } from "./global";
import { useCallback } from "react";
import rolesMenus from "../../db/roles-menus.json";
const AdminContext = createContext({
  //================================================================
  themeColor: "",
  setThemeColor: () => {},
  //================================================================
  menuList: [],
  setMenuList: () => {},
  //================================================================
  expandedMenuID: 0,
  setExpandedMenuID: () => {},
  //================================================================
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: () => {},
  //================================================================
  isSidebarCollapsed_mobile: false,
  setIsSidebarCollapsed_mobile: () => {},
  //================================================================
  openingTabList: [],
  setOpeningTabList: () => {},
  //================================================================
  activeTab: 0,
  setActiveTab: () => {},
});
export function AdminContextProvider({ children }) {
  const navigate = useNavigate();
  const savedColor = !config.themelist.includes(Cookies.get("themeColor"))
    ? config.themelist[0]
    : Cookies.get("themeColor");
  const [themeColor, setThemeColor] = useState(savedColor);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    Cookies.get("isSidebarCollapsed") === "true"
  );
  const [isSidebarCollapsed_mobile, setIsSidebarCollapsed_mobile] =
    useState(true);
  const [menuList, setMenuList] = useState([]);
  const [openingTabList, setOpeningTabList] = useState(config.defaultTab);
  const [activeTab, setActiveTab] = useState(config.defaultTab[0]?.MenuID);
  const [expandedMenuID, setExpandedMenuID] = useState(0);
  const { storeName } = useGlobalContext();
  const value = {
    themeColor,
    setThemeColor,
    menuList,
    setMenuList,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isSidebarCollapsed_mobile,
    setIsSidebarCollapsed_mobile,
    openingTabList,
    setOpeningTabList,
    activeTab,
    setActiveTab,
    expandedMenuID,
    setExpandedMenuID,
  };
  const getRoleMenu = async () => {
    return rolesMenus;
  };
  const LoadMenuRole = useCallback(async () => {
    const menu = await getRoleMenu();
    setMenuList(menu);
  }, []);
  useEffect(() => {
    const currentActiveTab = openingTabList.find((x) => x.MenuID === activeTab);
    document.title = currentActiveTab?.Title + " Admin Template";
  }, [activeTab, openingTabList]);
  useEffect(() => {
    Cookies.set("isSidebarCollapsed", isSidebarCollapsed, {
      expires: 365,
      path: "/",
    });
  }, [isSidebarCollapsed]);
  useEffect(() => {
    Cookies.set("themeColor", themeColor, { expires: 365, path: "/" });
  }, [themeColor]);
  useEffect(() => {
    LoadMenuRole();
  }, [LoadMenuRole, navigate, storeName]);
  useEffect(() => {
    const resizeWindows = () => {
      setExpandedMenuID(0);
      if (!isSidebarCollapsed_mobile) {
        setIsSidebarCollapsed_mobile(true);
      }
      if (window.innerWidth < 1024 && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", resizeWindows);
    return () => {
      window.removeEventListener("resize", resizeWindows);
    };
  }, [isSidebarCollapsed_mobile, isSidebarCollapsed]);
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within AdminContextProvider");
  }
  return context;
}
