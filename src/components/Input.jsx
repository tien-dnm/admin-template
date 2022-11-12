import React from "react";
import clsx from "clsx";
export const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        "border border-gray-300  text-gray-900 text-sm rounded  block w-full p-2 outline-none",
        "enabled:bg-white ",
        "disabled:bg-[#f2f2f2] disabled:border-[#e6e6e6]",
        "focus:ring-blue-500 focus:border-blue-500 focus:shadow-input focus:shadow-blue-500"
      )}
    ></input>
  );
};
export const Label = ({ isRequired, ...props }) => {
  return (
    <label
      {...props}
      className={clsx(
        `my-1 text-sm font-bold text-gray-900 block`,
        isRequired && "required"
      )}
    />
  );
};
