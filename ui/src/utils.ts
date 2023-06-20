import { useStore } from "./store";
import { consoleLogMode } from "./constants";

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
					if("mark" in store[key][key2] && !key2.includes('__scry_'))
						newPS[key2] = (store[key][key2]?.poke);
					else if("path" in store[key][key2] && !key2.includes('__scry_'))
						newPS[key2] = (store[key][key2]?.data);
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
export const summonPortal = (bundle, RootComponent) => {
}

export const renameBundle = (str) => {
  if (str.length < 2) {
    return "";
  } else {
    return 'b' + str[0].toUpperCase() + str.slice(1);
  }
}

export const getCurrentDashboard = (dashboards, _currentDashboard) => {
	return dashboards.sDashboards.data.filter((db) => {
		if (db.id === _currentDashboard) {
			return true;
		}
		return false;
	})[0].portals.map(portal => setCoordinates(portal));
}

export const setCoordinates = (portal) => {
	return {...portal, 
		coordinates: {
			x1: Number(portal.coordinates.x1.slice(2)),
			y1: Number(portal.coordinates.y1.slice(2)),
			x2: Number(portal.coordinates.x2.slice(2)),
			y2: Number(portal.coordinates.y2.slice(2)),
		}
	};
}

export const cc = (text, type = 'default') => consoleLogMode.map(cType => type === cType  ? console.log(text) : null);

export const rdToFloat = (rd) => Number(rd.slice(2));
