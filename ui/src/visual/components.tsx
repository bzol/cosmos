import {
	Alert,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	ScrollView,
	PanResponder,
} from "react-native";
import { useEffect } from "react";
import declare from "../../library/declare";
import {
	getPS,
	renameBundle,
	renameComponent,
	getCurrentDimension,
	scry,
	getData,
	cc
} from "../common/utils";
import {
	windowWidth,
	windowHeight,
	isWeb,
	isIos,
	isAndroid,
	drawerPullZone,
} from "../common/constants";
import { useStore } from "../common/store";
import {
	GestureHandlerRootView,
	Gesture,
	GestureDetector,
} from "react-native-gesture-handler";
import { calculatePortalPosition, getIdx } from "../common/utils";
import { handleWebInput } from "../input/webinput";

if (isWeb) {
	document.body.style.overflow = "hidden";
	window.addEventListener("contextmenu", (e) => e.preventDefault());
}

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
	const Component = declare.components[portal.component];
	const store = useStore((s) => s);

	const portalPosition = calculatePortalPosition(store, portal.coordinates);
	return (
		<View
			style={{
				...portalStyles.container,
				...portalPosition,
			}}
		>
			<Component portal={portal} {...bundle} />
		</View>
	);
};

export const TmpPortal = ({ store, tmpPortal }) => {
	const portalPosition = calculatePortalPosition(store, {
		x1: getIdx(tmpPortal.pointA, 0),
		y1: getIdx(tmpPortal.pointA, 1),
		x2: getIdx(tmpPortal.pointB, 0),
		y2: getIdx(tmpPortal.pointB, 1),
	});
	return (
		<View
			style={{
				...portalStyles.container,
				...portalPosition,
			}}
		></View>
	);
};

export const Canvas = () => {
	const { _zoom, _focusOnPortal, _pan, _currentDimension } = useStore();
	const store = useStore((s) => s);
	const dimensions = getData(store._apis, 'dimension', 'dimension-0.0.1', 'sDimensions');
	useEffect(() => {
		// cc('hello');
	}, []);
	cc(dimensions);
	if ( dimensions === null )
		return(<Text>Loading</Text>);
	// const dimensionPortals = getCurrentDimension(
	// 	dimensions,
	// 	_currentDimension
	// );
	return (
		<View
			style={dimensionStyles.container}
			onWheel={handleWebInput(store)}
			onMouseMove={handleWebInput(store)}
			onMouseDown={handleWebInput(store)}
			onMouseUp={handleWebInput(store)}
		>
			{/* <View> */}
			{/* 	{dimensionPortals.map((portal) => { */}
			{/* 		return <Portal portal={portal} />; */}
			{/* 	})} */}
			{/* 	{store._tmpPortal?.id !== undefined && ( */}
			{/* 		<TmpPortal store={store} tmpPortal={store._tmpPortal} /> */}
			{/* 	)} */}
			{/* </View> */}
		</View>
	);
};

const dimensionStyles = StyleSheet.create({
	container: {
		flex: 1,
		position: "absolute",
		left: 0,
		top: 0,
		borderWidth: 5,
		width: windowWidth,
		height: windowHeight,
		backgroundColor: "#93a1a1",
	},
});

const portalStyles = StyleSheet.create({
	container: {
		position: "absolute",
		backgroundColor: "#859900",
		borderWidth: 10,
		alignItems: "left",
	},
});
