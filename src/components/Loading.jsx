import React from "react";

export const Loading = ({ show, className, isInAdminLayout }) => {
  return (
    <>
      {show && (
        <div
          className={`fixed w-screen h-screen top-0 left-0 flex bg-black/30 justify-center items-center z-max ${className}`}
        >
          <div className="w-16  h-16 border-8 border-x-blue-600 border-y-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};
