import React from "react";
export const Row = ({ children, className = "" }) => {
  return <div className={`custom-row ${className}`}>{children}</div>;
};
