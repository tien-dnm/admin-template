import React from "react";
export const Col = ({
	mobile = "",
	sm = "",
	md = "",
	lg = "",
	xl = "",
	xxl = "",
	children,
	className = "",
	style,
}) => {
	const mobileClass = !mobile
		? ""
		: mobile >= 12
		? `basis-full`
		: `basis-${mobile}/12`;
	const smClass = !sm ? "" : sm >= 12 ? `sm:basis-full` : `sm:basis-${sm}/12`;
	const mdClass = !md ? "" : md >= 12 ? `md:basis-full` : `md:basis-${md}/12`;
	const lgClass = !lg ? "" : lg >= 12 ? `lg:basis-full` : `lg:basis-${lg}/12`;
	const xlClass = !xl ? "" : xl >= 12 ? `xl:basis-full` : `xl:basis-${xl}/12`;
	const xxlClass = !xxl
		? ""
		: xxl >= 12
		? `2xl:basis-full`
		: `2xl:basis-${xxl}/12`;
	const elementClass =
		` ${mobileClass} ${smClass} ${mdClass} ${lgClass} ${xlClass} ${xxlClass} ${className}`
			.replace(/\s+/g, " ")
			.trim();
	return (
		<div className={`${elementClass || "basis-full"}`} style={style}>
			{children}
		</div>
	);
};
