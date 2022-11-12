import { useEffect } from "react";
import ReactTooltip from "react-tooltip";

export function useTooltip() {
	useEffect(() => {
		ReactTooltip.rebuild();
	});
}
