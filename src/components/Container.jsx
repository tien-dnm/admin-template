import React from "react";
export const Container = ({ children, className = "", ...props }) => {
  return (
    <div className={`custom-container ${className}`} {...props}>
      {children}
    </div>
  );
};
