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
} from "./constants";
import { useStore } from "./store";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

// document.body.style.overflow = "hidden";

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

const calculatePortalPosition = (_camera, coordinates) => {
	return {
		left: coordinates.x - _camera.x,
		top: coordinates.y - _camera.y,
		width: coordinates.w,
		height: coordinates.h,
	};
};

export const Loading = (store) => {
	return <Text>...Loading</Text>;
};

export const Inventory = (store) => {
	return <Text>Inventory</Text>;
};

const Drawer = () => {
	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0, // Only set the pan responder if the gesture is downward
			onPanResponderRelease: (_, gestureState) => {
				if (gestureState.dy > 50) {
					// User has pulled down the drawer by at least 50 pixels
					console.log("Drawer pulled down!");
					// Trigger your event or update your state here
				}
			},
		})
	).current;

	return (
		<View style={{ flex: 1 }} {...panResponder.panHandlers}>
			{/* Your drawer content */}
		</View>
	);
};

export const SpellBook = (store) => {
	return (
		<View
			style={{
				// position: "absolute",
				top: 0,
				left: 0,
			}}
		>
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
				}}
			>
				hello
			</View>
			SpellBook
		</View>
	);
};

export const Portal = ({ portal }) => {
	const bundle = getPS(declare.bundles[renameBundle(portal.bundle)]);
	const Component = declare.components[renameComponent(portal.component)];
	const { _camera } = useStore();

	const portalPosition = calculatePortalPosition(_camera, portal.coordinates);
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

export const Dashboard = ({ dashboard }) => {
	const { _zoom, _focusOnPortal, _pan } = useStore();
	const gesture = Gesture.Pan()
		.onBegin((input) => console.log(input))
		.onUpdate(() => console.log("it updates!"))
		.onEnd(() => console.log("it ends!"))
		.onFinalize(() => {});
		console.log(Gesture);
	return (
		<GestureDetector gesture={gesture}>
			<View style={dashboardStyles.container}>
				{dashboard.portals.map((portal) => {
					return <Portal portal={portal} />;
				})}
			</View>
		</GestureDetector>
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
	_screen: { type: "dashboard", id: "hood" },
	_camera: { x: 0, y: 0, w: windowWidth, h: windowHeight },
	_zoom: (input) =>
		set((s) => {
			console.log("_zoom");
			console.log(input);
			if (isWeb) {
				return { _camera: { x: s._camera.x, y: s._camera.y } };
			}
			return { _camera: { x: 100, y: 100 } };
			// isWeb ?
			// 	:
			// return ({_camera: camera});
		}),
	_pan: (input) =>
		set((s) => {
			console.log("_pan");
			console.log(input.nativeEvent);
			// console.log(input.nativeEvent.contentOffset.x);
			// console.log(input.nativeEvent.contentOffset.y);
			// if (isWeb) {
			// 	return {
			// 		_camera: {
			// 			x: s._camera.x + input.nativeEvent.contentOffset.x,
			// 			y: s._camera.y + input.nativeEvent.contentOffset.y,
			// 		},
			// 	};
			// }
			return {};
		}),
	_focusOnPortal: (input) =>
		set((s) => {
			console.log("_focusOnPortal");
			// console.log(s.dashboard);
			const dashboard = s.dashboard.sDashboards.data.filter(
				(d) => d.id === s._screen.id
			)[0];
			dashboard.portals.map((portal) => {
				if (isWeb) {
					console.log(portal);
					console.log(input.pageX);
				} else {
				}
			});
			return {};
		}),
	_addNewPortal: (input) =>
		set((s) => {
			console.log("_addNewPortal");
		}),
	_changePortal: (input) =>
		set((s) => {
			console.log("_changePortal");
		}),
	_toggleInventory: (input) =>
		set((s) => {
			console.log("_toggleInventory");
		}),
	_toggleSpellBook: (input) =>
		set((s) => {
			console.log("_toggleSpellBook");
		}),
});
