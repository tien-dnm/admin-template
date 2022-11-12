import React, { useMemo } from "react";
import { Tree } from "primereact/tree";
import { removeAccents } from "../global/helpers/utilities";
export const DTree = ({ searchvalue = "", value = [], ...props }) => {
	const filterTree = (array, search) => {
		const srch = removeAccents(search).toLowerCase();
		const f = (o) => {
			let t;
			if (o.children) {
				t = o.children.filter(f);
			}
			if (
				removeAccents(o.label.toLowerCase()).includes(srch) ||
				(t && t.length)
			) {
				if (t) {
					o.items = t;
				}
				return true;
			}
		};
		return array.filter(f);
	};

	const FilteredTreeValue = useMemo(
		() => filterTree(value, searchvalue),
		[searchvalue, value]
	);

	return <Tree {...props} value={FilteredTreeValue} />;
};
