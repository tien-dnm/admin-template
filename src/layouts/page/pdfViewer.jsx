import React, { useEffect, useState } from "react";
import { Document, Outline, Page } from "react-pdf/dist/esm/entry.webpack5";
import useCheckMobileScreen from "../../global/custom_hooks/checkmobile";
import { useParams } from "react-router-dom";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
const PDFViewer = () => {
	const { object } = useParams();
	const isMobile = useCheckMobileScreen();
	const url = `blob:${window.location.origin}/${object}`;

	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess(data) {
		setNumPages(data.numPages);
	}

	return (
		<>
			<Document
				file={url}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Outline></Outline>
				{Array.from(new Array(numPages), (el, index) => (
					<Page
						key={`page_${index + 1}`}
						pageNumber={index + 1}
					/>
				))}
			</Document>
		</>
	);
};
export default PDFViewer;
