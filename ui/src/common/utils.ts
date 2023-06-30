import { useStore } from "./store";
import { windowWidth, windowHeight, consoleLogMode } from "./constants";
import { matrix, index, subset, multiply, subtract } from "mathjs";

export const isLoading = (store) => {
	if (store === undefined) return true;
	for (const key in store) {
		if (!key.startsWith("_")) {
			for (const key2 in store[key]) {
				if (
					store[key][key2]["path"] !== undefined &&
					store[key][key2]["data"] === undefined
				) {
					return true;
				}
			}
		}
	}

	return false;
};

export const getPS = (bundle) => {
	const extractPS = (store) => {
		let extractedPS = {};
		Object.keys(store).forEach(function (key, index) {
			if (!key.startsWith("_")) {
				let newPS = {};
				Object.keys(store[key]).forEach(function (key2, index2) {
					if ("mark" in store[key][key2] && !key2.includes("__scry_"))
						newPS[key2] = store[key][key2]?.poke;
					else if ("path" in store[key][key2] && !key2.includes("__scry_"))
						newPS[key2] = store[key][key2]?.data;
				});
				extractedPS[key] = newPS;
			}
		});
		return extractedPS;
	};
	return useStore((s) => bundle(extractPS(s)));
};

// Widget, Portal, Open your portal to a new world!
// Dashboard, Board, Desk, Canvas, table, workspace, workbench, console, slab, stand, platform (but associated with different things in CS), wall, tab, pile, window, patchwork, plaid, collage, fusion, composite, pastiche
// People using this are magicians, using magic,
// create a portal on a plaid/collage?
export const summonPortal = (bundle, RootComponent) => {};

export const renameBundle = (str) => {
	if (str.length < 2) {
		return "";
	} else {
		return "b" + str[0].toUpperCase() + str.slice(1);
	}
};

export const getCurrentDimension = (dimensions, _currentDimension) => {
	return dimensions
		.filter((db) => {
			if (db.id === _currentDimension) {
				return true;
			}
			return false;
		})[0]
		.portals.map((portal) => setCoordinates(portal));
};

export const setCoordinates = (portal) => {
	return {
		...portal,
		coordinates: {
			x1: Number(portal.coordinates.x1.slice(2)),
			y1: Number(portal.coordinates.y1.slice(2)),
			x2: Number(portal.coordinates.x2.slice(2)),
			y2: Number(portal.coordinates.y2.slice(2)),
		},
	};
};

export const cc = (text, type = "default") =>
	consoleLogMode.map((cType) => (type === cType ? console.log(text) : null));

export const rdToFloat = (rd) => Number(rd.slice(2));

export const getIdx = (mtx, idx) => subset(mtx, index(idx));

export const calculatePortalPosition = (store, coordinates) => {
	const c1 = subtract(
		multiply(matrix([coordinates.x1, coordinates.y1, 1]), store._tMatrix),
		store._camera
	);
	const c2 = subtract(
		multiply(matrix([coordinates.x2, coordinates.y2, 1]), store._tMatrix),
		store._camera
	);
	return {
		left: getIdx(c1, 0),
		top: getIdx(c1, 1),
		// width: coordinates.w*(windowWidth/store._camera.w),
		// height: coordinates.h*(windowHeight/store._camera.h),
		width: pointToWidthHeight(c1, c2).width,
		height: pointToWidthHeight(c1, c2).height,
		// width: coordinates.w*2,
		// height: coordinates.h*2,
	};
};

export const pointToWidthHeight = (c1, c2) => {
	const wh = subtract(c2, c1);
	return { width: getIdx(wh, 0), height: getIdx(wh, 1) };
};

export const getData = (apis, desk, id, name) => {
	let data = null;
	apis.map((api) => {
		if (api.desk === desk && api.id === id && api.name === name) {
			data = api.data;
		}
	});
	return data;
};

export const scry = (apis, desk, id, name) => {
	apis.map((api) => {
		if (api.desk === desk && api.id === id && api.name === name) {
			api.endpoint("");
		}
	});
};

export const getPoke = (apis, desk, id, name) => {
	let poke = null;
	apis.map((api) => {
		if (api.desk === desk && api.id === id && api.name === name) {
			poke = api.endpoint;
		}
	});
	return poke;
};
