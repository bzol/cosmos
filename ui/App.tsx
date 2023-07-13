import { useEffect } from "react";
import { useAsync } from "react-async";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useStore } from "./src/common/store";
import declare from "./library/declare";
import { scryCharges } from "@urbit/api";
import { isLoading, getPS, cc, scry } from "./src/common/utils";
import { Loading, Inventory, SpellBook, Canvas } from "./src/visual/components";
import { Urbit } from "@uqbar/react-native-api";
import { windowWidth, windowHeight } from "./src/common/constants";
import { fetchDesk } from "./src/data/desks";
require("setimmediate");

const desks = ["hitler"];

export default function App() {
	const {
		_newStore,
		_loading,
		_setUrbit,
		_urbit,
		_setLoading,
		mode,
		_addDesk,
	} = useStore();
	const store = useStore((s) => s);
	// console.log(store);
	useEffect(() => {
		_setUrbit();
		scry(store._endpoints, "dimension", "dimension-0.0.1", "sDimensions");
		scry(store._endpoints, "dimension", "dimension-0.0.1", "sDesks");
		desks.map((desk) => fetchDesk(_addDesk, desk));
	}, []);
	if (isLoading(store)) {
		return (
			<View style={styles.container}>
				<Text>...Loading</Text>
			</View>
		);
	} else {
		return <Canvas />;
		// return <Text> Loaded </Text>
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
