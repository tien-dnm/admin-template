import React, { useState, useEffect, lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import { useGlobalContext } from "./global/context/global";

import AdminLayout from "./layouts/admin";
import PageLayout from "./layouts/page";
import ErrorPage from "./layouts/page/Error";
import ReactTooltip from "react-tooltip";
import { useCallback } from "react";
import menus from "./db/menus.json";
export default function App() {
  const { storeName } = useGlobalContext();
  const [routeList, setRouteList] = useState([]);

  //=============================================================
  const getMenu = async () => {
    const data = menus;
    return data.filter((x) => x.MNTYPE !== "ROOT");
  };
  const LoadRoute = useCallback(async () => {
    const route = await getMenu();
    setRouteList(route);
  }, []);
  //=============================================================
  useEffect(() => {
    if (storeName) {
      LoadRoute();
    }
  }, [LoadRoute, storeName]);
  //=============================================================
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <PageLayout isAuthorize={false}>
                <ErrorPage StatusCode={404} />
              </PageLayout>
            }
          />
          <Route path="/" element={<Outlet />}>
            <Route index element={<AdminLayout />} />
            {routeList &&
              routeList.map((x, i) => {
                const Page = lazy(() =>
                  import(`./pages/${x.MNOBJECT}/index.jsx`)
                );
                return (
                  <Route
                    key={i}
                    path={x.MNPATH}
                    element={
                      <Suspense>
                        <ErrorBoundary
                          fallback={
                            <PageLayout>
                              <ErrorPage StatusCode={404} />
                            </PageLayout>
                          }
                        >
                          <PageLayout isAuthorize={true} title={x.MNNAME}>
                            <Page controller={x.MNOBJECT} />
                          </PageLayout>
                        </ErrorBoundary>
                      </Suspense>
                    }
                  />
                );
              })}
          </Route>
        </Routes>
      </Router>
      <ReactTooltip effect="solid" delayShow={0} class="!px-1.5 !py-1 z-full" />
    </>
  );
}
