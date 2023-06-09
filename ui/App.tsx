import { useEffect } from "react";
import { useAsync } from "react-async";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useStore, scryAll } from "./src/store";
import declare from "./library/declare";
import { bDashboard } from "./library/bundles/dashboard";
import { scryCharges } from "@urbit/api";
import { isLoading, getPS } from "./src/utils";
import {
	Loading,
	Inventory,
	SpellBook,
	Canvas,
} from "./src/visuals/components";
import { Urbit } from "@uqbar/react-native-api";
import { isMocking, mockStore } from "./src/mockstore";
import { windowWidth, windowHeight } from "./src/constants";
require("setimmediate");

export default function App() {
	const { _newStore, _loading, _setUrbit, _urbit, _setLoading, mode, _zoom } =
		useStore();
	const store = useStore((s) => s);
	console.log(store);
	useEffect(() => {
		if (!isMocking) {
			_setUrbit();
			scryAll(store)();
		}
	}, []);
	if (isLoading(store) && !isMocking) {
		return (
			<View style={styles.container}>
				<Text>...Loading</Text>
			</View>
		);
	} else {
		return <Canvas />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "absolute",
		width: windowWidth,
		height: windowHeight,
		// zIndex: 0,
		// backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
	},
});
