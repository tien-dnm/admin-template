import React from "react";

const icon = [
	{
		type: "ROOT",
		icon: [
			{
				open: true,
				class: "fa-folder-open",
			},
			{
				open: false,
				class: "fa-folder",
			},
		],
	},
	{
		type: "FORM",
		icon: [
			{
				open: true,
				class: "fa-file-lines",
			},
			{
				open: false,
				class: "fa-file-lines",
			},
		],
	},
	{
		type: "REPORT",
		icon: [
			{
				open: true,
				class: "fa-file-chart-column",
			},
			{
				open: false,
				class: "fa-file-chart-column",
			},
		],
	},
];
const MenuIcon = React.memo(
	({ isopening = false, type = "", className = "" }) => {
		const iconClass = icon
			.find((x) => x.type === type)
			.icon.find((x) => x.open === isopening).class;
		return (
			<i className={`fa-solid ${iconClass} text-base ${className}`}></i>
		);
	}
);
export default MenuIcon;
