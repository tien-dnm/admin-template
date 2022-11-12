import React, { Fragment, memo } from "react";
import SubMenu from "./SubMenu";
import MenuIcon from "./MenuIcon";
import { useAdminContext } from "../../global/context/admin";
import { useTabPage } from "./services";
import { useCallback } from "react";
import { useMemo } from "react";

function ParentsMenu() {
  const tab = useTabPage();
  const {
    themeColor,
    isSidebarCollapsed,
    menuList,
    expandedMenuID,
    setExpandedMenuID,
  } = useAdminContext();

  const handleClickMenu = useCallback(
    (isroot, menu) => {
      if (isroot) {
        setExpandedMenuID(expandedMenuID === menu.ROLEMNID ? 0 : menu.ROLEMNID);
      } else {
        tab.Add(menu);
      }
    },
    [expandedMenuID, setExpandedMenuID, tab]
  );
  const distinctRole = useMemo(() => {
    const uniqueRole = [...new Set(menuList?.map((item) => item.ROLEID))];
    return uniqueRole;
  }, [menuList]);
  return useMemo(
    () => (
      <ul className={`pt-1.5 pb-4 space-y-1 text-sm`}>
        {menuList &&
          distinctRole?.map((item) => {
            const thisRole = menuList.find((x) => x.ROLEID === item);
            const menubyRole = menuList.filter((x) => x.ROLEID === item);
            const parent = menubyRole.filter((x) => x.RLMNUPID === 0);
            return (
              <Fragment key={thisRole.ROLEID}>
                <li
                  className={`group text-white flex py-1.5 pr-0 relative  ${
                    isSidebarCollapsed ? `hidden` : ""
                  }`}
                >
                  <div
                    className={`flex py-1.5 pl-2.5 pr-0 font-medium cursor-pointer text-white items-center `}
                  >
                    <i className="fa-solid fa-users-gear text-base"></i>
                    <span
                      className={`w-60 whitespace-nowrap pl-3 select-none ${
                        isSidebarCollapsed
                          ? `hidden group-hover:block group-hover:bg-white absolute left-full py-1.5 top-0 `
                          : ""
                      }`}
                    >
                      {thisRole.ROLENM}
                    </span>
                  </div>
                </li>
                {parent &&
                  parent.map((menu, index) => {
                    menu.MNTYPE = menu.MNID == null ? "ROOT" : menu.MNTYPE;
                    const isMenuOpening = expandedMenuID === menu.ROLEMNID;
                    const isRootMenu = menu.MNTYPE === "ROOT";
                    return (
                      <li
                        key={index}
                        className={`group !mt-0 relative ${
                          isMenuOpening ? ` text-white` : ``
                        }`}
                      >
                        <div
                          className={`flex py-2 pl-2.5 pr-0 font-medium cursor-pointer text-white items-center hover:bg-${themeColor}-hv`}
                          onClick={() => handleClickMenu(isRootMenu, menu)}
                        >
                          <MenuIcon
                            type={menu.MNTYPE}
                            isopening={isMenuOpening}
                          />
                          <span
                            className={`w-60 whitespace-nowrap pl-3 select-none ${
                              isSidebarCollapsed
                                ? `hidden group-hover:block group-hover:bg-${themeColor}-hv  absolute left-full py-2.5 top-0  `
                                : ""
                            }`}
                          >
                            {menu.RLMNNAME || menu.MNNAME}
                          </span>
                          <i
                            className={`fa-solid fa-angle-right text-xs absolute right-4 transition-transform origin-center ${
                              isMenuOpening ? "rotate-90" : ""
                            } ${
                              isSidebarCollapsed || !isRootMenu ? "!hidden" : ""
                            }`}
                          ></i>
                        </div>
                        <SubMenu
                          parent={menu}
                          menulist={menuList}
                          showingParentMenu={expandedMenuID}
                          childLevel={1}
                        />
                      </li>
                    );
                  })}
              </Fragment>
            );
          })}
      </ul>
    ),
    [
      distinctRole,
      expandedMenuID,
      handleClickMenu,
      isSidebarCollapsed,
      menuList,
      themeColor,
    ]
  );
}
export default memo(ParentsMenu);
