import React from "react";
import { useState } from "react";
import Select from "react-select";
export const DSelect = ({ value, options, ...props }) => {
  return (
    <Select
      value={value && options.find((x) => x.value == value)}
      options={options}
      styles={{
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 999999, // arbitrary z-index value, you should reference your z-index scale/strategy for this value
        }),
      }}
      menuPosition="fixed"
      {...props}
    />
  );
};
