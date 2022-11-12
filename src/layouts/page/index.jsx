import React, { useEffect } from "react";
import { Container } from "../../components";
import { useLoading } from "../../global/custom_hooks/loading";
import { Loading } from "../../components";
const PageLayout = ({
	title = "",
	isInAdminLayout = false,
	children,
	isAuthorize = false,
	...props
}) => {
	const loading = useLoading();
	if (isAuthorize) {
	}
	if (!isInAdminLayout) {
		document.title = title + " Admin Template";
	}
	useEffect(() => {
		loading.show();
		setTimeout(() => {
			loading.hide();
		}, 500);
	}, []);
	return (
		<>
			<Loading
				show={loading.isShown}
				isInAdminLayout={isInAdminLayout}
			/>
			<div className="w-full bg-[#f2f2f7] min-h-full p-[13px] pb-[30px] flex items-stretch relative">
				<div className=" px-0 py-3 shadow-md  min-h-full w-full relative bg-white rounded">
					<Container className={` min-h-full h-full `}>
						{!isInAdminLayout && title && (
							<h1 className="text-xl font-extrabold uppercase pb-1 mb-1 border-b text-black border-slate-300">
								{title}
							</h1>
						)}
						{children}
					</Container>
				</div>
			</div>
		</>
	);
};
export default PageLayout;
