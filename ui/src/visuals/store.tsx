import {
	windowWidth,
	windowHeight,
	isWeb,
	isIos,
	isAndroid,
	drawerPullZone,
} from "../constants";
import { setMouseAction, none, pan, zoom, portal } from "./controls";
import { matrix } from "mathjs";

export const visualStore = (set) => ({
	// STATE
	_currentDashboard: "hood",
	_mouseAction: "_none",
	_camera: matrix([10,0,1]),
	_tMatrix: matrix([
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	]),
	_tmpPortal: "none",
	// CONTROLS
	_setMouseAction: setMouseAction(set),
	_none: none(set),
	_pan: pan(set),
	_zoom: zoom(set),
	_portal: portal(set),
});
