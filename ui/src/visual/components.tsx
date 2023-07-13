import {
	Alert,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	ScrollView,
	PanResponder,
	Button,
	Keyboard,
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
	cc,
	calculateSpellBook
} from "../common/utils";
import {
	windowWidth,
	windowHeight,
	isWeb,
	isIos,
	isAndroid,
	drawerPullZone,
	borderWidth
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
	const components = useStore((s) => s._components);
	const _addPortal = useStore((s) => s._addPortal);
	const _spellBook = useStore((s) => s._spellBook);

	return (
		<View
			style={{
				position: "absolute",
				left: 0,
				top: 0,
				width: windowWidth,
				height: windowHeight,
				backgroundColor: "rgba(100,100,0,0.9)",
				zIndex: 100000000,
			}}
		>
			{components.map((component, idx) => {
				const leftGap = 100;
				const left =
					10 + leftGap * Math.floor(((leftGap * idx) % windowWidth) / leftGap);
				const top = 10 + 50 * Math.floor((leftGap * idx) / windowWidth);
				// const {left, top} = calculateSpellBook(component, idx, _spellBook);
				// console.log(idx);
				// console.log(Math.floor((100*idx)/windowWidth));
				return (
					<View
						key={idx}
						style={{
							position: "absolute",
							left,
							top,
							backgroundColor: "red",
							caretHidden: true,
							cursor: "default",
							// width: windowWidth,
							// height: windowHeight,
							// backgroundColor: "rgba(100,100,0,0.9)",
							// zIndex: 100000000,
						}}
						onMouseDown={(e) => _addPortal(e)(component)}
					>
						<Text
							style={{
								cursor: "default",
								caretHidden: true,
							}}
						>
							{component.id}
						</Text>
					</View>
				);
			})}
		</View>
	);
};

export const Portal = ({ portal }) => {
	const store = useStore((s) => s);
	const portalPosition = calculatePortalPosition(store, portal.coordinates);
	const Component = store._components.filter((component) => {
		if (component.id === portal.component) return true;
		return false;
	})[0]?.component;

	if (Component) {
		return (
			<View
				style={{
					...portalStyles.container,
					...portalPosition,
				}}
				// onWheel={() => console.log("r")}
				onMouseMove={handleWebInput(store, portal)}
				onMouseDown={handleWebInput(store, portal)}
				onMouseUp={handleWebInput(store, portal)}
				onWheel={handleWebInput(store, portal)}
			>
				<Component key={portal.id} portalPosition={portalPosition}/>
			</View>
		);
	} else return <Text>XXXXXXXXXX</Text>;
};

export const Canvas = () => {

	const { _currentDimension } = useStore();
	const store = useStore((s) => s);
	const dimensions = getData(
		store._endpoints,
		"dimension",
		"dimension-0.0.1",
		"sDimensions"
	);

	useEffect(() => {
		window.addEventListener("keydown", handleWebInput(store, null));
		window.addEventListener("keyup", handleWebInput(store, null));

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("keydown", handleWebInput(store, null));
			window.removeEventListener("keyup", handleWebInput(store, null));
		};
	}, []);

	if (dimensions === null || dimensions.length === 0)
		return <Text>No Dimensions</Text>;
	const dimensionPortals = getCurrentDimension(dimensions, _currentDimension);
	return (
		<View
			style={dimensionStyles.container}
			onWheel={handleWebInput(store, null)}
			onMouseMove={handleWebInput(store, null)}
			onMouseDown={handleWebInput(store, null)}
			onMouseUp={handleWebInput(store, null)}
		>
			<View>
				{store._spellBook.visible && <SpellBook />}
				{dimensionPortals.map((portal) => {
					return <Portal key={portal.id} portal={portal} />;
				})}
			</View>
		</View>
	);
};

const dimensionStyles = StyleSheet.create({
	container: {
		flex: 1,
		position: "absolute",
		left: 0,
		top: 0,
		width: windowWidth,
		height: windowHeight,
		backgroundColor: "#93a1a1",
	},
});

const portalStyles = StyleSheet.create({
	container: {
		position: "absolute",
		backgroundColor: "#859900",
		borderWidth,
		alignItems: "left",
	},
});
