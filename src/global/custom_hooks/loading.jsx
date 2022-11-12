import React, { useContext, createContext, useState } from "react";

const LoadingContext = createContext({
	show: () => {},
	hide: () => {},
	isShown: false,
});

export function LoadingProvider({ children }) {
	const [isShown, setIsShown] = useState(false);
	const show = () => {
		setIsShown(true);
	};
	const hide = () => {
		setIsShown(false);
	};
	const value = { show, hide, isShown };
	return (
		<LoadingContext.Provider value={value}>
			{children}
		</LoadingContext.Provider>
	);
}

export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used within LoadingProvider");
	}
	return context;
}
