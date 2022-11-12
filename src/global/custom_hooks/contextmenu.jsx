import React, {
	useContext,
	createContext,
	useState,
	useRef,
	useEffect,
} from "react";
import { ContextMenu } from "../../components";
const ContextMenuContext = createContext({
	setModel: () => {},
	ref: null,
});

export function ContextMenuProvider({ children }) {
	const [model, setModel] = useState([]);
	const ref = useRef(null);

	const value = { setModel, ref };
	return (
		<ContextMenuContext.Provider value={value}>
			{children}
			<ContextMenu
				ref={ref}
				model={model}
			/>
		</ContextMenuContext.Provider>
	);
}

export function useContextMenu(model) {
	const context = useContext(ContextMenuContext);
	const [shouldRefetch, refetch] = useState({});
	if (!context) {
		throw new Error(
			"useContextMenu must be used within ContextMenuProvider"
		);
	}
	const { ref, setModel } = context;
	useEffect(() => {
		setModel(model);
	}, [shouldRefetch]);
	const refresh = () => refetch({});
	const show = (event) => {
		ref.current.show(event);
		refresh();
	};
	return { setModel, show };
}
