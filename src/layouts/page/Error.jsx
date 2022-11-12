import React, { useEffect, useState } from "react";
import { useLoading } from "../../global/custom_hooks/loading";
const HttpStatusString = {
	200: "OK",
	201: "Created",
	202: "Accepted",
	203: "Non-Authoritative Information",
	204: "No Content",
	205: "Reset Content",
	206: "Partial Content",
	300: "Multiple Choices",
	301: "Moved Permanently",
	302: "Found",
	303: "See Other",
	304: "Not Modified",
	305: "Use Proxy",
	306: "Unused",
	307: "Temporary Redirect",
	400: "Bad Request",
	401: "Unauthorized",
	402: "Payment Required",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	406: "Not Acceptable",
	407: "Proxy Authentication Required",
	408: "Request Timeout",
	409: "Conflict",
	410: "Gone",
	411: "Length Required",
	412: "Precondition Required",
	413: "Request Entry Too Large",
	414: "Request-URI Too Long",
	415: "Unsupported Media Type",
	416: "Requested Range Not Satisfiable",
	417: "Expectation Failed",
	418: "I'm a teapot",
	429: "Too Many Requests",
	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
	505: "HTTP Version Not Supported",
};
const ErrorPage = ({ StatusCode }) => {
	const [showError, setShowError] = useState(false);
	const loading = useLoading();
	useEffect(() => {
		setShowError(false);
		loading.show();
		setTimeout(() => {
			setShowError(true);
			loading.hide();
		}, 1500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		showError && (
			<section className="w-full text-center">
				<h1 className="text-7xl pt-20 font-bold text-red-800">
					{StatusCode}
				</h1>
				<div>{HttpStatusString[StatusCode]}</div>
			</section>
		)
	);
};
export default ErrorPage;
