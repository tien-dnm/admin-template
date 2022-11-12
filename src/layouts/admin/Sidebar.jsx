import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ParentMenu from "./ParentsMenu";
import { useAdminContext } from "../../global/context/admin";
export default function Sidebar() {
  const { themeColor, isSidebarCollapsed, isSidebarCollapsed_mobile } =
    useAdminContext();

  const generatedClass = useMemo(() => {
    const baseClass = `h-full pb-5 overflow-auto ease-in-out duration-150 absolute z-[12] no-scrollbar bg-${themeColor}`;
    let fullClass = isSidebarCollapsed_mobile
      ? "w-0 sm:!overflow-hidden"
      : "w-60";
    fullClass += isSidebarCollapsed
      ? " lg:w-10 lg:!overflow-visible"
      : " lg:w-60";
    return `${baseClass} ${fullClass} `;
  }, [isSidebarCollapsed, isSidebarCollapsed_mobile, themeColor]);

  return useMemo(() => {
    return (
      <div className={generatedClass}>
        <div className="pt-1.5 text-center overflow-hidden">
          <Link to="#" className={`text-white font-bold`}>
            {isSidebarCollapsed ? (
              <i className="fad fa-cloud"></i>
            ) : (
              "Admin Template"
            )}
          </Link>
        </div>
        <ParentMenu />
      </div>
    );
  }, [generatedClass, isSidebarCollapsed]);
}
