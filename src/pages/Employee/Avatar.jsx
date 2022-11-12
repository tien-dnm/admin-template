import React, { useState, useEffect, memo } from "react";
import * as request from "./request";
import { noImage } from "../../global/assets/img";
const EmployeeAvatar = ({ id, className }) => {
  const [imageLink, setImageLink] = useState(noImage);
  //componentDidMount
  useEffect(() => {
    // if (id) {
    //   request.getEmployeeImage(id).then((blob) => {
    //     let url = URL.createObjectURL(blob);
    //     setImageLink(url);
    //   });
    // }
  }, [id]);
  //componentDidUnMount
  useEffect(() => {
    // return () => {
    //   URL.revokeObjectURL(imageLink);
    // };
  });
  return (
    <img
      className={`object-cover object-center ${className}`}
      src={imageLink}
      alt="avatar"
    />
  );
};
export default memo(EmployeeAvatar);
