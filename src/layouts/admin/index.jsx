import React from "react";
import Sidebar from "./Sidebar";
import { AdminContextProvider } from "../../global/context/admin";
import MainContent from "./MainContent";

export default function AdminLayout() {
  // return html
  return (
    <div className="relative h-full">
      <AdminContextProvider>
        <Sidebar />
        <MainContent />
      </AdminContextProvider>
    </div>
  );
}
