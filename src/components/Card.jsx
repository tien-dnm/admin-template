import React from "react";
export const Card = ({ children, className = "" }) => {
	return (
		<div
			className={`bg-white rounded border border-gray-100 shadow-md flex flex-col ${className}`}>
			{children}
		</div>
	);
};
export const CardHeader = ({ children, className = "" }) => {
	return (
		<div
			className={`p-2 bg-gray-100/70 font-bold text-base rounded-t border-b ${className}`}>
			{children}
		</div>
	);
};

export const CardBody = ({ children, className = "" }) => {
	return (
		<div className={`p-2 py-3 flex-1 text-sm ${className}`}>{children}</div>
	);
};
export const CardFooter = ({ children, className = "" }) => {
	return (
		<div
			className={`p-2 bg-gray-100/70 font-bold text-base rounded-b text-right border-t ${className}`}>
			{children}
		</div>
	);
};
