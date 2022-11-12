import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAdminContext } from "../../global/context/admin";
import { useTabPage } from "./services";
import { useCallback } from "react";
import { ContextMenu } from "../../components";

export default function HeaderTabs() {
  const [selectedTabOnContextMenu, setSelectedTabOnContextMenu] = useState({});
  const ref_UL = useRef();
  const cm = useRef();
  const ref_LI = useRef([]);
  const ref_scrollBack = useRef();

  const tab = useTabPage();
  const { themeColor, openingTabList, activeTab, setActiveTab } =
    useAdminContext();

  const items = useMemo(
    () => [
      {
        label: "Tải lại tab",
        icon: "pi pi-refresh",
        command: () => {
          tab.Refresh(selectedTabOnContextMenu.MenuID);
        },
      },
      {
        label: "Đóng tab",
        icon: "pi pi-times",
        visible: selectedTabOnContextMenu.CanClose,
        command: () => {
          tab.Close(selectedTabOnContextMenu.MenuID);
        },
      },
      {
        label: "Mở sang cửa sổ mới",
        icon: "pi pi-external-link",
        command: () => {
          tab.OpenInNewTab(selectedTabOnContextMenu.MenuID);
        },
      },
    ],
    [selectedTabOnContextMenu, tab]
  );

  const handleClickTab = useCallback(
    (event, thisTab) => {
      const clicktime = event.detail;
      //click one time
      if (clicktime === 1) {
        if (activeTab !== thisTab.MenuID) {
          setActiveTab(thisTab.MenuID);
        }
      }
      //double click
      if (clicktime === 2) {
        tab.Refresh(thisTab.MenuID);
      }
    },
    [activeTab, setActiveTab, tab]
  );
  const handleContextMenu = useCallback((event, tab) => {
    setSelectedTabOnContextMenu(tab);
    cm.current.show(event);
  }, []);
  const scroll = useCallback(
    (scrollOffset) => (ref_UL.current.scrollLeft += scrollOffset),
    []
  );

  useEffect(() => {
    ref_LI.current = ref_LI.current.slice(0, openingTabList.length);
  }, [openingTabList]);

  useEffect(() => {
    const listMenuID = openingTabList.map((x) => x.MenuID);
    const currentMenuID = activeTab;
    const index = listMenuID.indexOf(currentMenuID);
    const scrollBackButtonWidth = ref_scrollBack.current.offsetWidth;
    //============================
    const ulElement = ref_UL.current;
    const ulClientWidth = ulElement?.clientWidth;
    //============================
    const liElement = ref_LI.current[index];
    const liOffsetLeft = liElement?.offsetLeft;
    const liWidth = liElement?.clientWidth;
    const liOffsetRight = liWidth + liOffsetLeft;
    //============================
    if (liOffsetRight <= ulClientWidth) {
      ulElement.scrollLeft = 0;
    }
    if (liOffsetRight + scrollBackButtonWidth > ulClientWidth) {
      ulElement.scrollLeft =
        liOffsetLeft - scrollBackButtonWidth - ulClientWidth / 2 + liWidth / 2;
    }
  }, [activeTab, openingTabList]);

  return useMemo(() => {
    return (
      <>
        <ContextMenu model={items} ref={cm}></ContextMenu>
        <div className="w-full  bg-white relative  z-10 overflow-auto box shadow-md ">
          <button
            ref={ref_scrollBack}
            onClick={() => scroll(-200)}
            className={`bg-white  absolute top-0 left-0 block h-full text-center w-8 border-r`}
          >
            <i className="fa-solid fa-caret-left text-black"></i>
          </button>
          <button
            onClick={() => scroll(200)}
            className={`bg-white  absolute top-0 right-0 block h-full text-center w-8 border-l`}
          >
            <i className="fa-solid fa-caret-right text-black"></i>
          </button>
          <ul
            className="px-8 border-bottom-none no-scrollbar overflow-y-hidden whitespace-nowrap  bg-white scroll-smooth text-xs"
            ref={ref_UL}
          >
            {openingTabList &&
              openingTabList.map((item, index) => {
                const isThisTabOpening = activeTab === item.MenuID;
                return (
                  <li
                    ref={(el) => (ref_LI.current[index] = el)}
                    key={index}
                    className={`float-none h-8 inline-flex px-3 items-center font-medium ${
                      isThisTabOpening
                        ? `bg-${themeColor} text-${themeColor}-tx`
                        : `bg-white hover:bg-slate-200 text-black`
                    } border border-t-0 border-b-0 hover:bg-${themeColor}-hv`}
                  >
                    <button
                      onContextMenu={(e) => handleContextMenu(e, item)}
                      onClick={(e) => {
                        handleClickTab(e, item);
                      }}
                      className="p-2 select-none"
                    >
                      {item.Title}
                    </button>
                    {item.CanClose && (
                      <button
                        onClick={() => {
                          tab.Close(item.MenuID);
                        }}
                      >
                        <i
                          className={`fa-solid fa-xmark mr-1 text-xs ${
                            isThisTabOpening ? ` text-white` : ` text-red-600`
                          }`}
                        ></i>
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
        {/* <ContextMenu model={items} ref={contextmenu}></ContextMenu> */}
      </>
    );
  }, [
    openingTabList,
    scroll,
    activeTab,
    themeColor,
    handleContextMenu,
    handleClickTab,
    tab,
  ]);
}
