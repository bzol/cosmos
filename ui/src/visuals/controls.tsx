import { windowWidth, windowHeight, drawerPullZone } from "../constants";
import {
	isInsidePortal,
	isOnPortalBorder,
	isOnEmptySpace,
	getIdx,
} from "./utils";
import { getPS } from "../utils";
import { scryAll } from "../store";
import { bDashboard } from "../../library/bundles/dashboard";
import { matrix, multiply, index, subset } from "mathjs";

export const setMouseAction = (set) => (action) => {
	set((s) => {
		return {
			_mouseAction: action,
		};
	});
};

export const none = (set) => () => {
	set((s) => {
		// TODO pSync modified portals
		let tmpPortal = "none";
		const dashboard = s.dashboard.sDashboards.data.filter(
			(d) => d.id === s._currentDashboard
		)[0];
		if (s._tmpPortal?.id !== undefined) {
			let isNewPortal = true;
			let modifiedPortals = dashboard.portals.map((portal) => {
				if (portal.id === s._tmpPortal.id) {
					isNewPortal = false;
					return { ...portal };
				}
				return portal;
			});
			if (isNewPortal)
				modifiedPortals.push({
					component: "SpellBook",
					bundle: "dashboard",
					id: s._tmpPortal.id,
					coordinates: {
						x1:getIdx(s._tmpPortal.pointA,0),
						y1:getIdx(s._tmpPortal.pointA,1),
						x2:getIdx(s._tmpPortal.pointB,0),
						y2:getIdx(s._tmpPortal.pointB,1),
					},
					attributes: {},
				});
			console.log(modifiedPortals);
			s.dashboard.pSync.poke({
				sync: { id: dashboard.id, portals: modifiedPortals, delete: false },
			});
			setTimeout(scryAll(s), 10);
		}
		return { _tmpPortal: tmpPortal };
	});
};

export const pan = (set) => (input) =>
	set((s) => {
		console.log("_pan");
		// console.log(input.nativeEvent.contentOffset.x);
		// console.log(input.nativeEvent.contentOffset.y);
		// if (isWeb) {
		return {
			_camera: matrix([
				subset(s._camera, index(0)) + input.movementX,
				subset(s._camera, index(1)) + input.movementY,
				1,
			]),
			_mouseAction: "_pan",
		};
		// }
		return {};
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

		return { _tMatrix: tMatrix };
	});
};

export const portal = (set) => (input) =>
	set((s) => {
		if (s._tmpPortal === "disabled") return {};

		const dashboard = s.dashboard.sDashboards.data.filter(
			(d) => d.id === s._currentDashboard
		)[0];

		let tmpPortal = "disabled";
		dashboard.portals.map((portal) => {
			if (s._tmpPortal === "none") {
				// if on a portal's border => move that border
				// if on empty space => start a new portal
				// if inside a portal => 'disable'
				if (isInsidePortal()) tmpPortal = "disabled";
				if (isOnPortalBorder()) tmpPortal = "disabled";
				if (isOnEmptySpace()) {
					console.log("isOnEmptySpace");
					const pointA = matrix([input.pageX, input.pageY, 1]);
					const pointB = matrix([input.pageX, input.pageY, 1]);
					// const pointA = multiply(matrix([input.pageX,input.pageY,1]),s._tMatrix);
					// const pointB = multiply(matrix([input.pageX,input.pageY,1]),s._tMatrix);
					tmpPortal = {
						id: String(Date.now()),
						pointA,
						pointB,
						// x1: input.pageX + getIdx(s._camera,0),
						// y1: input.pageY + getIdx(s._camera,1),
						// x2: 0,
						// y2: 0,
					};
				}
				return;
			} else if (s._tmpPortal.id !== undefined) {
				// if (isInsidePortal() || isOnPortalBorder()) tmpPortal = null;
				if (isOnEmptySpace()) {
					const pointB = matrix([input.pageX, input.pageY, 1]);
					tmpPortal = {
						id: s._tmpPortal.id,
						pointA: s._tmpPortal.pointA,
						pointB,
						// y1: s._tmpPortal.y1,
						// x2: input.pageX + getIdx(s._camera,0),
						// y2: input.pageY + getIdx(s._camera,1),
					};
				}
			}
		});
		console.log(tmpPortal);
		return { _tmpPortal: tmpPortal };
	});

// 	// console.log("_zoombadabum");
// 	// if (isWeb) {
// 	// 	return { _camera: { x: s._camera.x, y: s._camera.y } };
// 	// }
// 	// return { _camera: { x: 100, y: 100 } };
// 	// isWeb ?
// 	// 	:
// 	// return ({_camera: camera});
// });

// _focusOnPortal: (input) =>
// 	set((s) => {
// 		console.log("_focusOnPortal");
// 		// console.log(s.dashboard);
// 		const dashboard = s.dashboard.sDashboards.data.filter(
// 			(d) => d.id === s._currentDashboard
// 		)[0];
// 		dashboard.portals.map((portal) => {
// 			if (isWeb) {
// 				console.log(portal);
// 				console.log(input.pageX);
// 			} else {
// 			}
// 		});
// 	}),
export const addNewPortal = (set) => (input) =>
	set((s) => {
		console.log("_addNewPortal");
		return { _mouseAction: "_none" };
	});
// _changePortal: (input) =>
// 	set((s) => {
// 		console.log("_changePortal");
// 		return { _mouseAction: "_none" };
// 	}),
export const moveScreensBegin = (set) => (input) => set((s) => ({}));

export const moveScreens = (set) => (input) =>
	set((s) => {
		console.log("_moveScreens");
		return {};
		return { _screenLine: s._screenLine + input.movementY };
		return {};
	});

export const moveScreensEnd = (set) => (input) =>
	set((s) => {
		if (
			!(
				input.pageY < drawerPullZone ||
				input.pageY > windowHeight - drawerPullZone
			)
		)
			return { _mouseAction: "_none" };

		if (
			s._currentDashboard === "inventory" &&
			input.pageY >= windowHeight / 2.0
		) {
			console.log("1");
			return {
				_screenLine: 0,
				_currentDashboard: "dashboard",
				_mouseAction: "_none",
			};
		} else if (
			input.pageY >= 0 &&
			input.pageY < windowHeight / 2.0 &&
			s._currentDashboard === "dashboard"
		) {
			console.log("2");
			return {
				_screenLine: -windowHeight,
				_currentDashboard: "inventory",
				_mouseAction: "_none",
			};
		} else if (
			input.pageY >= windowHeight / 2.0 &&
			input.pageY < windowHeight &&
			s._currentDashboard === "dashboard"
		) {
			console.log("3");
			return {
				_screenLine: windowHeight,
				_currentDashboard: "spellbook",
				_mouseAction: "_none",
			};
		} else if (
			input.pageY < windowHeight / 2.0 &&
			s._currentDashboard === "spellbook"
		) {
			console.log("4");
			return {
				_screenLine: 0,
				_currentDashboard: "dashboard",
				_mouseAction: "_none",
			};
		} else return { _mouseAction: "_none" };
	});
