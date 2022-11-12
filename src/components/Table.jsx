import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
const template1 = {
	layout: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport",
	FirstPageLink: (options) => {
		return (
			<button
				type="button"
				className={options.className}
				onClick={options.onClick}
				disabled={options.disabled}
			>
				<span className="p-3">
					<i className="fa-solid fa-chevrons-left"></i>
				</span>
				<Ripple />
			</button>
		);
	},
	LastPageLink: (options) => {
		return (
			<button
				type="button"
				className={options.className}
				onClick={options.onClick}
				disabled={options.disabled}
			>
				<span className="p-3">
					<i className="fa-solid fa-chevrons-right"></i>
				</span>
				<Ripple />
			</button>
		);
	},
	PrevPageLink: (options) => {
		return (
			<button
				type="button"
				className={options.className}
				onClick={options.onClick}
				disabled={options.disabled}
			>
				<span className="p-3">
					<i className="fa-solid fa-chevron-left"></i>
				</span>
				<Ripple />
			</button>
		);
	},
	NextPageLink: (options) => {
		return (
			<button
				type="button"
				className={options.className}
				onClick={options.onClick}
				disabled={options.disabled}
			>
				<span className="p-3">
					<i className="fa-solid fa-chevron-right"></i>
				</span>
				<Ripple />
			</button>
		);
	},
	PageLinks: (options) => {
		if (
			(options.view.startPage === options.page &&
				options.view.startPage !== 0) ||
			(options.view.endPage === options.page &&
				options.page + 1 !== options.totalPages)
		) {
			const className = classNames(options.className, {
				"p-disabled": true,
			});

			return (
				<span
					className={className}
					style={{ userSelect: "none" }}
				>
					...
				</span>
			);
		}

		return (
			<button
				type="button"
				className={options.className}
				onClick={options.onClick}
			>
				{options.page + 1}
				<Ripple />
			</button>
		);
	},
	RowsPerPageDropdown: (options) => {
		const dropdownOptions = [
			{ label: 10, value: 10 },
			{ label: 20, value: 20 },
			{ label: 50, value: 50 },
			{ label: "Tất cả", value: options.totalRecords },
		];
		return (
			<Dropdown
				value={options.value}
				options={dropdownOptions}
				onChange={options.onChange}
			/>
		);
	},
};

export const Table = ({
	responsiveLayout = "scroll",
	paginator = true,
	rows = 10,
	currentPageReportTemplate = "Hiển thị {first} đến {last} trong số {totalRecords}",
	size = "small",
	stripedRows = true,
	paginatorTemplate = template1,
	emptyMessage = "Không tìm thấy dữ liệu",
	scrollDirection = "horizontal",
	scrollable = true,
	resizableColumns = true,
	columnResizeMode = "fit",
	...props
}) => {
	return (
		<DataTable
			responsiveLayout={responsiveLayout}
			paginator={paginator}
			paginatorTemplate={paginatorTemplate}
			currentPageReportTemplate={currentPageReportTemplate}
			rows={rows}
			size={size}
			stripedRows={stripedRows}
			emptyMessage={emptyMessage}
			scrollDirection={scrollDirection}
			scrollable={scrollable}
			resizableColumns={resizableColumns}
			columnResizeMode={columnResizeMode}
			{...props}
		>
			{props.children}
		</DataTable>
	);
};
export { Column };
