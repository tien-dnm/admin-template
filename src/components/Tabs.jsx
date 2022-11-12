import React from "react";
//============================================================================================
export const TabsItem = ({ id, title, activeTab, setActiveTab }) => {
	const handleClick = () => {
		setActiveTab(id);
	};
	return (
		<li
			onClick={handleClick}
			className={`${
				activeTab === id
					? "active bg-green-600 text-white"
					: "bg-gray-200 text-black"
			} rounded-t mr-2 cursor-pointer`}>
			<a className="inline-block py-3 px-5">{title}</a>
		</li>
	);
};
//============================================================================================
export const TabsContent = ({ id, activeTab, children }) => {
	return activeTab === id ? (
		<div className="p-4 bg-white border text-sm">{children}</div>
	) : null;
};
//============================================================================================
export const TabsHeader = ({ children }) => {
	return (
		<div className="">
			<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
				{children}
			</ul>
		</div>
	);
};
//============================================================================================
export const TabsBody = ({ children }) => {
	return <div>{children}</div>;
};
//============================================================================================
export const Tabs = ({ children }) => {
	return <div>{children}</div>;
};
