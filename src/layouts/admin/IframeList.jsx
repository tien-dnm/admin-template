import React, { lazy, Suspense, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAdminContext } from "../../global/context/admin";
import ErrorPage from "../page/Error";
import PageLayout from "../page/index";
import PDFViewer from "../page/pdfViewer";
export default function IframeList() {
	const { isSidebarCollapsed, activeTab, openingTabList } = useAdminContext();
	return useMemo(() => {
		return (
			openingTabList &&
			openingTabList.map((tab, index) => {
				return (
					<div
						key={`${index}_${tab.Key}`}
						className={`${
							isSidebarCollapsed ? "lg:pl-10" : " lg:pl-60"
						} bg-white pl-0 absolute h-full left-0 pt-[4.4rem] overflow-hidden top-0 w-full ${
							activeTab === tab.MenuID ? "" : "hidden"
						}`}
					>
						<div className="h-full overflow-auto">
							<ListChild
								tab={tab}
								refreshKey={tab.Key}
							/>
						</div>
					</div>
				);
			})
		);
	}, [isSidebarCollapsed, activeTab, openingTabList]);
}

const ListChild = React.memo(({ tab, refreshKey }) => {
	if (tab.IsPDF) {
		return <PDFViewer url={tab.Path}></PDFViewer>;
	} else {
		const Page = lazy(() => import(`../../pages/${tab.Object}/index.jsx`));
		return (
			<Suspense>
				<ErrorBoundary
					fallback={
						<PageLayout>
							<ErrorPage StatusCode={404} />
						</PageLayout>
					}
				>
					<PageLayout
						isAuthorize={true}
						title={tab.Title}
						isInAdminLayout={true}
					>
						<Page
							rf={refreshKey}
							controller={tab.Object}
						/>
					</PageLayout>
				</ErrorBoundary>
			</Suspense>
		);
	}
});
