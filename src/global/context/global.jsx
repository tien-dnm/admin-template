import React, { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import { getSubdomain } from "../helpers/utilities";

const GlobalContext = createContext({
	username: "",
	setUsername: () => {},
	storeName: "",
	setStoreName: () => {},
});

export function GlobalContextProvider({ children }) {
	//username
	const [username, setUsername] = useState(Cookies.get("username"));
	const [storeName, setStoreName] = useState(getSubdomain());
	const value = {
		username,
		setUsername,
		storeName,
		setStoreName,
	};
	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
}

export function useGlobalContext() {
	const context = useContext(GlobalContext);
	if (!context) {
		throw new Error(
			"useGlobalContext must be used within GlobalContextProvider"
		);
	}
	return context;
}
