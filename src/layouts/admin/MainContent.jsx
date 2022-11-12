import React, { useMemo } from "react";
import HeaderNavbar from "./HeaderNavbar";
import HeaderTabs from "./HeaderTabs";
import IframeList from "./IframeList";
import { useAdminContext } from "../../global/context/admin";
import { useCallback } from "react";
const MainContent = () => {
  const {
    isSidebarCollapsed,
    isSidebarCollapsed_mobile,
    setIsSidebarCollapsed_mobile,
    setExpandedMenuID,
  } = useAdminContext();

  const handleClickOutside = useCallback(() => {
    // if click outside toggle mobile button, close mobile panel
    if (!isSidebarCollapsed_mobile && window.innerWidth < 1024) {
      setIsSidebarCollapsed_mobile(true);
    }
    //if on desktop, click outside the sidebar make opening menu closed
    if (window.innerWidth >= 1024 && isSidebarCollapsed) {
      setExpandedMenuID(0);
    }
  }, [
    isSidebarCollapsed,
    isSidebarCollapsed_mobile,
    setExpandedMenuID,
    setIsSidebarCollapsed_mobile,
  ]);
  return useMemo(() => {
    return (
      <div
        className={`${
          isSidebarCollapsed ? "lg:pl-10" : "lg:pl-60"
        } pl-0 h-full z-10 `}
        onClick={handleClickOutside}
      >
        <HeaderNavbar />
        <HeaderTabs />
        <IframeList />
      </div>
    );
  }, [isSidebarCollapsed, handleClickOutside]);
};
export default MainContent;
