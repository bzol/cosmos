import {
	Alert,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	ScrollView,
	PanResponder,
} from "react-native";
import declare from "../library/declare";
import { getPS, renameBundle, renameComponent } from "./utils";
import {
	windowWidth,
	windowHeight,
	isWeb,
	isIos,
	isAndroid,
	drawerPullZone,
} from "./constants";
import { useStore } from "./store";
import { isMocking, mockStore } from "./mockstore";
import { bDashboard } from "../library/bundles/dashboard";
import {
	GestureHandlerRootView,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";

if (isWeb) {
	document.body.style.overflow = "hidden";
	window.addEventListener("contextmenu", (e) => e.preventDefault());
}

// have a map for navigating a tapestry/carpet/rug?
// Fractal: View that contains portals
// Mobile:
// can be portrait or landscape
// zoom: pinch
// pan: swipe
// focus on portal: double tap
// add new portal: drag and drop from SpellBook to a place without another portal (except canvas portal), then resize the portal however you like, set the attributes of the portal, then either delete the portal or click save
// modify or delete portal: you hold with finger on portal, then you can add attributes/delete/change size of the app, then click save
// Inventory: comes from top drawer, no matter if portrait or landscape mode
// Spellbook: comes from bottom drawer, no matter if portrait or landscape mode
// Sequence mode: activate with three fingers, move through portals in sequence, like in Apple/Android apps
// Desktop:
// zoom: zoom to mouse location using scroll
// pan: click and hold with scroll
// focus on portal: double (or single?) scroll click
// add new portal: same as in mobile, just with mouse
// modify or delete portal: same as mobile, only you hold with the scroll
// Inventory: comes from top of the screen
// SpellBook: comes from bottom of the screen
// Sequence mode: left+right click hold and drag to move through the portals
//

const calculatePortalPosition = (store, coordinates) => {
	return {
		left: coordinates.x - store._camera.x,
		top: coordinates.y - store._camera.y + store._screenLine,
		width: coordinates.w,
		height: coordinates.h,
	};
};

export const Loading = () => {
	return <Text>...Loading</Text>;
};

export const Inventory = () => {
	const store = useStore((s) => s);
	return (
		<View
			style={{
				position: "absolute",
				top: -windowHeight - store._screenLine,
				left: 0,
				backgroundColor: "#123456",
				width: windowWidth,
				height: windowHeight,
			}}
		>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
			<Text>Inventory</Text>
		</View>
	);
};

export const SpellBook = () => {
	const store = useStore((s) => s);
	return (
		<View
			style={{
				position: "absolute",
				top: windowHeight - store._screenLine,
				left: 0,
				width: windowWidth,
				height: windowHeight,
				backgroundColor: "#654321",
			}}
		>
			<Text>SpellBook</Text>
		</View>
	);
};

export const Portal = ({ portal }) => {
	const bundle = getPS(declare.bundles[renameBundle(portal.bundle)]);
	const Component = declare.components[renameComponent(portal.component)];
	const store = useStore((s) => s);

	const portalPosition = calculatePortalPosition(store, portal.coordinates);
	return (
		<View
			style={{
				...portalStyles.container,
				...portalPosition,
			}}
		>
			<Component {...bundle} />
		</View>
	);
};

export const Canvas = () => {
	const { _zoom, _focusOnPortal, _pan, _currentDashboard, _screen } =
		useStore();
	const store = useStore((s) => s);
	const dashboard = isMocking
		? { sDashboards: mockStore.dashboard.sDashboards.data }
		: getPS(bDashboard);
	const selectedDashboard = dashboard.sDashboards.filter((db) => {
		if (db.id === _currentDashboard) return db;
		return false;
	})[0];
	return (
		<GestureHandlerRootView>
			<GestureDetector gesture={mobileInput(store)}>
				<View
					style={dashboardStyles.container}
					onWheel={webInput(store)}
					onMouseMove={webInput(store)}
					onMouseDown={webInput(store)}
					onMouseUp={webInput(store)}
				>
					{_screen === "inventory" && <Inventory />}
					{_screen === "dashboard" && (
						<View>
							{selectedDashboard.portals.map((portal) => {
								return <Portal portal={portal} />;
							})}
						</View>
					)}
					{_screen === "spellbook" && <SpellBook />}
				</View>
			</GestureDetector>
		</GestureHandlerRootView>
	);
};

const dashboardStyles = StyleSheet.create({
	container: {
		flex: 1,
		position: "absolute",
		left: 0,
		top: 0,
		width: windowWidth,
		height: windowHeight,
		backgroundColor: "#FF0000",
	},
});

const portalStyles = StyleSheet.create({
	container: {
		position: "absolute",
		backgroundColor: "#00FF00",
		alignItems: "left",
	},
});

const getCenter = (camera) => {
	return { x: 0, y: 0 };
};

export const visualStore = (set) => ({
	_screen: "dashboard",
	_currentDashboard: "hood",
	_screenLine: 0,
	_mouseMovement: "_none",
	_camera: { x: 100, y: 100, w: windowWidth, h: windowHeight },
	// _spell/:
	_setCamera: (camera) =>
		set((s) => {
			return { _camera: camera };
		}),
	_setMouseMovement: (movement) =>
		set((s) => {
			return { _mouseMovement: movement };
		}),
	_none: (input) => ({}),
	_zoom: (input) =>
		set((s) => {
			console.log("_zoombadabum");
			if (isWeb) {
				return { _camera: { x: s._camera.x, y: s._camera.y } };
			}
			// return { _camera: { x: 100, y: 100 } };
			// isWeb ?
			// 	:
			// return ({_camera: camera});
		}),
	_pan: (input) =>
		set((s) => {
			console.log("_pan");
			// console.log(input.nativeEvent.contentOffset.x);
			// console.log(input.nativeEvent.contentOffset.y);
			// if (isWeb) {
			return {
				_camera: {
					x: s._camera.x + input.movementX,
					y: s._camera.y + input.movementY,
				},
				_mouseMovement: "_pan",
			};
			// }
			return {};
		}),
	_focusOnPortal: (input) =>
		set((s) => {
			console.log("_focusOnPortal");
			// console.log(s.dashboard);
			const dashboard = s.dashboard.sDashboards.data.filter(
				(d) => d.id === s._screen
			)[0];
			dashboard.portals.map((portal) => {
				if (isWeb) {
					console.log(portal);
					console.log(input.pageX);
				} else {
				}
			});
		}),
	_addNewPortal: (input) =>
		set((s) => {
			console.log("_addNewPortal");
			return {_mouseMovement: '_none'};
		}),
	_changePortal: (input) =>
		set((s) => {
			console.log("_changePortal");
			return {_mouseMovement: '_none'};
		}),
	_moveScreensBegin: (input) => set((s) => ({})),
	_moveScreens: (input) =>
		set((s) => {
			console.log("_moveScreens");
			return {};
			return { _screenLine: s._screenLine + input.movementY };
			// if (input.type === "mousemove") {
			// 	return {
			// 		_screenLine: {
			// 			pos: s._screenLine + input.movementY,
			// 		},
			// 		_mouseMovement: "_movescreens",
			// 	};
			// } else if (input.type === "mouseup") {
			// 	if (s._screenLine < -windowHeight / 2.0) {
			// 		console.log("err");
			// 		return {
			// 			_screenLine: { pos: -windowHeight },
			// 			_screen: "inventory",
			// 			_mouseMovement: "_none",
			// 		};
			// 	} else if (s._screenLine > windowHeight / 2.0) {
			// 		console.log("err2");
			// 		return {
			// 			_screenLine: { pos: windowHeight },
			// 			_mouseMovement: "_none",
			// 			_screen: "spellbook",
			// 		};
			// 	} else {
			// 		console.log("err3");
			// 		return {
			// 			_screenLine: { pos: 0 },
			// 			_screen: "dashboard",
			// 			_mouseMovement: "_none",
			// 		};
			// 	}
			return {};
		}),
	_moveScreensEnd: (input) =>
		set((s) => {
			if (
				!(
					input.pageY < drawerPullZone ||
					input.pageY > windowHeight - drawerPullZone
				)
			)
				return { _mouseMovement: "_none" };

			if (s._screen === "inventory" && input.pageY >= windowHeight / 2.0) {
				console.log("1");
				return {
					_screenLine: 0,
					_screen: "dashboard",
					_mouseMovement: "_none",
				};
			} else if (
				input.pageY >= 0 &&
				input.pageY < windowHeight / 2.0 &&
				s._screen === "dashboard"
			) {
				console.log("2");
				return {
					_screenLine: -windowHeight,
					_screen: "inventory",
					_mouseMovement: "_none",
				};
			} else if (
				input.pageY >= windowHeight / 2.0 &&
				input.pageY < windowHeight &&
				s._screen === "dashboard"
			) {
				console.log("3");
				return {
					_screenLine: windowHeight,
					_screen: "spellbook",
					_mouseMovement: "_none",
				};
			} else if (
				input.pageY < windowHeight / 2.0 &&
				s._screen === "spellbook"
			) {
				console.log("4");
				return {
					_screenLine: 0,
					_screen: "dashboard",
					_mouseMovement: "_none",
				};
			}
			// if (s._screenLine < -windowHeight / 2.0) {
			// 	console.log("err");
			// 	return {
			// 		_screenLine: -windowHeight,
			// 		_screen: "inventory",
			// 		_mouseMovement: "_none",
			// 	};
			// } else if (s._screenLine > windowHeight / 2.0) {
			// 	console.log("err2");
			// 	return {
			// 		_screenLine: windowHeight,
			// 		_screen: "spellbook",
			// 		_mouseMovement: "_none",
			// 	};
			// } else {
			// 	console.log("err3");
			// 	return {
			// 		_screenLine: 0,
			// 		_screen: "dashboard",
			// 		_mouseMovement: "_none",
			// 	};
			// }
			else return { _mouseMovement: "_none" };
		}),
});

export const inDrawerZone = (_screenLine) => {};

export const mobileInput = ({ _zoom, _pan }) => {
	if (isWeb) return Gesture.Race();
	return Gesture.Race();
};

// 1: left, 2: right, 3: left+right, 4: middle, 8/16: side buttons
export const webInput =
	({
		_moveScreensBegin,
		_moveScreens,
		_moveScreensEnd,
		_zoom,
		_pan,
		_focusOnPortal,
		_screenLine,
		_mouseMovement,
		_setMouseMovement,
		_none,
		_screen,
		_addNewPortal,
		_changePortal
	}) =>
	(input) => {
		console.log(_mouseMovement);
		let mouseMovement = _mouseMovement;
		if (
			input.buttons === 1 &&
			input.type === "mousedown" &&
			mouseMovement === "_none" &&
			(input.pageY < drawerPullZone ||
				input.pageY > windowHeight - drawerPullZone)
		) {
			mouseMovement = "_moveScreensBegin";
		} else if (
			mouseMovement === "_moveScreensBegin" &&
			input.type === "mouseup"
		) {
			mouseMovement = "_moveScreensEnd";
		} else if (
			input.type === "mousedown" &&
			input.buttons === 1 &&
			_screen === "dashboard"
		) {
			mouseMovement = "_pan";
		} else if (
			(mouseMovement === "_moveScreensBegin" ||
				(mouseMovement === "_pan" && _screen === "dashboard")) &&
			input.type === "mousemove" && 
			_screen === 'dashboard'
		) {
			mouseMovement = "_pan";
		} else if (
			mouseMovement === "_pan" &&
			input.type === "mouseup" &&
			_screen === "dashboard"
		) {
			mouseMovement = "_none";
		} else if (input.buttons === 4 && _screen === "dashboard") {
			console.log("fop");
			mouseMovement = "_focusOnPortal";
		} else if (input.buttons === 2 && _screen === "dashboard") {
			mouseMovement = "_changePortal";
		}
		  else if (input.buttons === 1 && _screen === "spellbook") {
			console.log("spellbook");
			mouseMovement = "_addNewPortal";
		}

		_setMouseMovement(mouseMovement);
		eval(mouseMovement + "(input)");
	};

// export const handlePan = Gesture.Pan().onBegin
// 	console.log(input);
// };
// export const handleZoom = (input) => {
// 	console.log(input);
// };
export const handleOnWheel = (store) => (input) => {
	console.log(input);
	console.log(store);
};
export const handleOnMouseMove = (input) => {
	console.log("move");
};
export const handleOnMouseUp = (input) => {
	console.log(input);
	console.log("up");
};
export const handleOnMouseDown = (input) => {
	console.log(input);
	console.log("down");
};
