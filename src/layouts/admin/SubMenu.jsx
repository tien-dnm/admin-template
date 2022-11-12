import React, { memo, useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useAdminContext } from "../../global/context/admin";
import MenuIcon from "./MenuIcon";
import { useTabPage } from "./services";

function SubMenu(props) {
  //global application context
  const { themeColor, isSidebarCollapsed } = useAdminContext();
  const tab = useTabPage();
  //childmenu list
  const children = useMemo(
    () => props.menulist.filter((x) => x.RLMNUPID === props.parent.ROLEMNID),
    [props]
  );
  //childmenu showing state
  const [showingChildMenu, setShowingChildMenu] = useState(0);
  //
  const isParentShowing = props.showingParentMenu === props.parent.ROLEMNID;
  //if change parent, close child menu
  useEffect(() => {
    if (!isParentShowing) {
      setShowingChildMenu(0);
    }
  }, [isParentShowing]);
  //if change menu collapse state, close child menu
  useEffect(() => {
    setShowingChildMenu(0);
  }, [isSidebarCollapsed]);
  //only change collapse state if menutype is root
  const handleClickMenu = useCallback(
    (event, isroot, menu) => {
      if (isroot) {
        setShowingChildMenu(
          showingChildMenu === menu.ROLEMNID ? 0 : menu.ROLEMNID
        );
      } else {
        tab.Add(menu);
      }
    },
    [showingChildMenu, tab]
  );
  return useMemo(
    () => (
      <ul
        className={`w-60 transition-all origin-top-right duration-300 bg-${themeColor} ease-in-out ${
          isSidebarCollapsed ? "absolute left-full -mt-10" : ""
        }  ${isParentShowing ? "max-h-960" : "max-h-0"} `}
      >
        {children.map((child) => {
          child.MNTYPE = child.MNID == null ? "ROOT" : child.MNTYPE;
          const isMenuOpening = showingChildMenu === child.ROLEMNID;
          const isRootMenu = child.MNTYPE === "ROOT";
          return (
            <li
              key={child.ROLEMNID}
              className={`${isParentShowing ? "" : "hidden"}`}
            >
              <div>
                <div
                  className={`text-white hover:bg-${themeColor}-hv  flex font-medium py-2 cursor-pointer items-center ${
                    isSidebarCollapsed
                      ? "px-6"
                      : `pr-0 pl-${props.childLevel * 6}`
                  }   `}
                  onClick={(event) => handleClickMenu(event, isRootMenu, child)}
                >
                  <MenuIcon type={child.MNTYPE} isopening={isMenuOpening} />
                  <span className="w-44 whitespace-nowrap text-ellipsis overflow-hidden  pl-3 select-none">
                    {child.RLMNNAME || child.MNNAME}
                  </span>
                  <i
                    className={`pi pi-chevron-right text-xs absolute right-1 transition-transform origin-center ${
                      isMenuOpening ? "rotate-90" : ""
                    } ${!isRootMenu ? "!hidden" : ""}`}
                  ></i>
                </div>
                <SubMenu
                  parent={child}
                  menulist={props.menulist}
                  showingParentMenu={showingChildMenu}
                  childLevel={props.childLevel + 1}
                />
              </div>
            </li>
          );
        })}
      </ul>
    ),
    [
      children,
      handleClickMenu,
      isParentShowing,
      isSidebarCollapsed,
      props,
      showingChildMenu,
      themeColor,
    ]
  );
}
export default memo(SubMenu);
