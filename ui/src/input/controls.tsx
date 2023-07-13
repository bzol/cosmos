import { windowWidth, windowHeight, drawerPullZone } from "../common/constants";
import { getIdx } from "../common/utils";
import {
	getPS,
	getCurrentDimension,
	getData,
	getPoke,
	scry,
	calculateDragPortal,
	calculateResizePortal,
} from "../common/utils";
import { scryAll } from "../common/store";
import { matrix, multiply, index, subset, inv } from "mathjs";

export const isInsidePortal = () => {
	return false;
};
export const isOnPortalBorder = (input, portal) => {
	console.log(portal);
	return false;
};
export const isOnEmptySpace = () => {
	return true;
};

export const setMouseAction = (set) => (action) => {
	set((s) => {
		return {
			_mouseAction: "_none",
		};
	});
};

export const none = (set) => (input) => {
	set((s) => {
		return {
			_spellBook: {
				visible: false,
				center: { x: input.pageX, y: input.pageY },
			},
		};
	});
};

export const pan = (set) => (input) =>
	set((s) => {
		if (input.type === "mouseup") {
			return {
				_mouseAction: "_none",
			};
		}

		return {
			_camera: matrix([
				subset(s._camera, index(0)) + input.movementX,
				subset(s._camera, index(1)) + input.movementY,
				1,
			]),
			_mouseAction: "_pan",
		};
	});

export const zoom = (set) => (input) => {
	set((s) => {
		const origo = matrix([0, 0]);
		const scaleOrigo = matrix([input.pageX, input.pageY]);
		const sx = input.deltaY > 0 ? 0.9 : 1.1;
		const px = getIdx(origo, 0) - getIdx(scaleOrigo, 0);
		const py = getIdx(origo, 1) - getIdx(scaleOrigo, 1);
		const scaleMatrix = matrix([
			[sx, 0, 0],
			[0, sx, 0],
			[0, 0, 1],
		]);
		const transformToOrigo = matrix([
			[1, 0, 0],
			[0, 1, 0],
			[px, py, 1],
		]);
		const transformFromOrigo = matrix([
			[1, 0, 0],
			[0, 1, 0],
			[-px, -py, 1],
		]);
		const camera = s._camera;
		let tMatrix = s._tMatrix;

		tMatrix = multiply(
			multiply(multiply(tMatrix, transformToOrigo), scaleMatrix),
			transformFromOrigo
		);

		return {
			_tMatrix: tMatrix,
			// _mouseAction: '_none'
		};
	});
};

export const openSpellBook = (set) => (input) => {
	set((s) => {
		if (input.type === "keyup") {
			return {
				_mouseAction: "_none",
				_spellBook: {
					visible: false,
					center: { x: input.pageX, y: input.pageY },
				},
			};
		}
		return {
			_spellBook: { visible: true, center: s._spellBook.center },
			_mouseAction: "_openSpellBook",
		};
	});
};

export const addPortal = (set) => (input) => (component) =>
	set((s) => {
		const dimensions = getData(
			s._endpoints,
			"dimension",
			"dimension-0.0.1",
			"sDimensions"
		);
		const pSync = getPoke(
			s._endpoints,
			"dimension",
			"dimension-0.0.1",
			"pSync"
		);
		const dimensionPortals = getCurrentDimension(
			dimensions,
			s._currentDimension
		);
		const tMatrixInverse = inv(s._tMatrix);
		const pointA = multiply(
			matrix([input.pageX, input.pageY, 1]),
			tMatrixInverse
		);
		const pointB = multiply(
			matrix([
				input.pageX + component.wRatio * 100,
				input.pageY + component.hRatio * 100,
				1,
			]),
			tMatrixInverse
		);
		const tmpPortal = {
			id: String(Date.now()),
			pointA,
			pointB,
		};
		dimensionPortals.push({
			id: String(Date.now()),
			component: component.id,
			desk: s._currentDimension,
			coordinates: {
				x1: getIdx(pointA, 0),
				y1: getIdx(pointA, 1),
				x2: getIdx(pointB, 0),
				y2: getIdx(pointB, 1),
			},
			attributes: {},
		});
		pSync({
			id: s._currentDimension,
			portals: dimensionPortals,
			delete: false,
		});
		setTimeout(
			() => scry(s._endpoints, "dimension", "dimension-0.0.1", "sDimensions"),
			100
		);
		return {
			// _mouseAction: "_none",
			// _showSpellBook: !s._showSpellBook };
		};
	});

export const dragPortal = (set) => (input) => (portal) =>
	set((s) => {
		const dimensions = getData(
			s._endpoints,
			"dimension",
			"dimension-0.0.1",
			"sDimensions"
		);
		const pSync = getPoke(
			s._endpoints,
			"dimension",
			"dimension-0.0.1",
			"pSync"
		);
		let dimensionPortals = getCurrentDimension(dimensions, s._currentDimension);
		const tMatrixInverse = inv(s._tMatrix);
		// const pointA = multiply(
		// 	matrix([input.pageX, input.pageY, 1]),
		// 	tMatrixInverse
		// );
		// const pointB = multiply(
		// 	matrix([
		// 		input.pageX + component.wRatio * 100,
		// 		input.pageY + component.hRatio * 100,
		// 		1,
		// 	]),
		// 	tMatrixInverse
		// );
		dimensionPortals = dimensionPortals.map((dPortal) => {
			if (dPortal.id === portal.id) {
				return {
					id: dPortal.id,
					component: dPortal.component,
					desk: dPortal.desk,
					coordinates: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 0,
						// x1: getIdx(pointA, 0),
						// y1: getIdx(pointA, 1),
						// x2: getIdx(pointB, 0),
						// y2: getIdx(pointB, 1),
					},
					attributes: {},
				};
			}
			return dPortal;
		});
		if (input.type === "mouseup") {
			pSync({
				id: s._currentDimension,
				portals: dimensionPortals,
				delete: false,
			});
			setTimeout(
				() => scry(s._endpoints, "dimension", "dimension-0.0.1", "sDimensions"),
				100
			);
			return { _mouseAction: "_none" };
		}
		return { _mouseAction: "_dragPortal" };
	});

export const noPortal = (set) => (input) => (portal) => {
	return { _mouseAction: "_none" };
};

export const finishChangePortal = (set) => (input) => (portal) =>
	set((s) => {
		const pSync = getPoke(
			s._endpoints,
			"dimension",
			"dimension-0.0.1",
			"pSync"
		);
		pSync({
			id: s._currentDimension,
			portals: s._endpoints[1]["data"][0]["portals"],
			delete: false,
		});
		setTimeout(
			() => scry(s._endpoints, "dimension", "dimension-0.0.1", "sDimensions"),
			100
		);
		return { _mouseAction: "_none" };
	});

export const changePortal = (set) => (input) => (portal) =>
	set((s) => {
		const dimensions = getData(
			s._endpoints,
			"dimension",
			"dimension-0.0.1",
			"sDimensions"
		);
		let dimensionPortals = getCurrentDimension(dimensions, s._currentDimension);
		const tMatrixInverse = inv(s._tMatrix);
		let pointA = null;
		let pointB = null;
		console.log("change");
		if (input.buttons === 1) [pointA, pointB] = calculateDragPortal(input, portal, s);
		else if (input._reactName === 'onWheel') [pointA, pointB] = calculateResizePortal(input, portal, s);
		else {
			pointA = matrix([portal.coordinates.x1, portal.coordinates.y1, 1]);
			pointB = matrix([portal.coordinates.x2, portal.coordinates.y2, 1]);
		}

		console.log(pointA);
		console.log(pointB);

		dimensionPortals = dimensionPortals.map((dPortal) => {
			if (dPortal.id === portal.id) {
				return {
					id: dPortal.id,
					component: dPortal.component,
					desk: dPortal.desk,
					coordinates: {
						// x1: 0,
						// y1: 0,
						// x2: 100.5,
						// y2: 100.5,
						x1: getIdx(pointA, 0),
						y1: getIdx(pointA, 1),
						x2: getIdx(pointB, 0),
						y2: getIdx(pointB, 1),
					},
					attributes: {},
				};
			} else return dPortal;
		});

		let newEndpoints = s._endpoints;
		newEndpoints[1]["data"][0]["portals"] = dimensionPortals;

		return { _mouseAction: "_changePortal", _endpoints: newEndpoints };
	});
