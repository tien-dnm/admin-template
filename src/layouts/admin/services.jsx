import { useAdminContext } from "../../global/context/admin";
import config from "../../global/config";
import { useCallback } from "react";
import rolesMenus from "../../db/roles-menus.json";
export const getRoleMenu = async (username) => {
  return new Promise((resolve) => {
    resolve({ data: rolesMenus });
  });
};

export const useTabPage = () => {
  const { activeTab, openingTabList, setActiveTab, setOpeningTabList } =
    useAdminContext();
  const Find = useCallback(
    (id) => openingTabList.find((x) => x.MenuID === id),
    [openingTabList]
  );
  const FindIndex = useCallback(
    (id) => openingTabList.map((item) => item.MenuID).indexOf(id),
    [openingTabList]
  );
  const Add = useCallback(
    (menu) => {
      const thistab = {
        MenuID: menu.ROLEMNID,
        Title: menu.RLMNNAME || menu.MNNAME,
        Object: menu.MNOBJECT,
        Path: menu.MNPATH,
        CanClose: true,
        IsPDF: menu.IS_PDF,
        Key: 1,
      };
      const thisMenu = Find(thistab.MenuID);
      if (!thisMenu) {
        setOpeningTabList([...openingTabList, thistab]);
        setActiveTab(thistab.MenuID);
      } else {
        setActiveTab(thisMenu.MenuID);
      }
    },
    [Find, openingTabList, setActiveTab, setOpeningTabList]
  );
  const Close = useCallback(
    (id) => {
      const index = FindIndex(id);
      if (activeTab === id) {
        const before = index - 1;
        setActiveTab(openingTabList[before]?.MenuID);
      }
      const notThisTab = openingTabList.filter((x) => x.MenuID !== id);
      setOpeningTabList(notThisTab);
    },
    [FindIndex, activeTab, openingTabList, setActiveTab, setOpeningTabList]
  );

  const CloseCurrent = useCallback(() => {
    const thisMenu = Find(activeTab);
    if (thisMenu.CanClose) {
      Close(activeTab);
    }
  }, [Close, Find, activeTab]);
  const Refresh = useCallback(
    (id) => {
      const thisMenu = Find(id);
      thisMenu.Key++;
      setOpeningTabList([...openingTabList]);
    },
    [Find, openingTabList, setOpeningTabList]
  );
  const RefreshCurrent = useCallback(() => {
    Refresh(activeTab);
  }, [Refresh, activeTab]);
  const CloseAll = useCallback(() => {
    const canNotClose = openingTabList.filter((x) => !x.CanClose);
    setOpeningTabList([...canNotClose]);
    setActiveTab(config.defaultTab[0]?.MenuID);
  }, [openingTabList, setActiveTab, setOpeningTabList]);

  const CloseOthers = useCallback(() => {
    const menuCanClose = openingTabList.filter(
      (x) => x.CanClose !== true || x.MenuID === activeTab
    );
    setOpeningTabList([...menuCanClose]);
  }, [activeTab, openingTabList, setOpeningTabList]);

  const OpenInNewTab = useCallback(
    (id) => {
      const thisMenu = Find(id);
      const path = `${thisMenu.Path}`;
      window.open(path, "_blank");
    },
    [Find]
  );
  return {
    Add,
    Refresh,
    Close,
    CloseAll,
    OpenInNewTab,
    CloseOthers,
    RefreshCurrent,
    CloseCurrent,
  };
};
