import React, { useRef } from "react";
export const Radio = ({
	label,
	onChange,
	disabled,
	className = "",
	...props
}) => {
	return (
		<label
			className={`text-sm font-medium ${
				disabled ? "text-gray-500" : "text-gray-900"
			} cursor-pointer w-100 flex items-center gap-1`}>
			<input
				{...props}
				type="radio"
				disabled={disabled}
				onChange={onChange}
				className={`w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 indeterminate:bg-gray-300 checked:bg-blue-500 accent-green-600 ${className}`}
			/>{" "}
			{label}
		</label>
	);
};
