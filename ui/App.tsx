import { useEffect } from "react";
import { useAsync } from "react-async";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useStore, scryAll } from "./src/store";
import declare from "./library/declare";
import { bDashboard } from "./library/bundles/dashboard";
import { scryCharges } from "@urbit/api";
import { isLoading, getPS, cc } from "./src/utils";
import {
	Loading,
	Inventory,
	SpellBook,
	Canvas,
} from "./src/visuals/components";
import { Urbit } from "@uqbar/react-native-api";
import { windowWidth, windowHeight } from "./src/constants";
import { fetchDesk } from "./src/desks";
require("setimmediate");

export default function App() {
	const { _newStore, _loading, _setUrbit, _urbit, _setLoading, mode, _zoom } =
		useStore();
	const store = useStore((s) => s);
	cc(store, "store");
	useEffect(() => {
			_setUrbit();
			scryAll(store)();
	}, []);
	if (isLoading(store)) {
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

fetchDesk('hitler');
