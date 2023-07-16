import { useEffect } from "react";
import { useAsync } from "react-async";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useStore } from "./src/common/store";
import declare from "./library/declare";
import { scryCharges } from "@urbit/api";
import { isLoading, getPS, cc, scry, getData } from "./src/common/utils";
import { Loading, Inventory, SpellBook, Canvas } from "./src/visual/components";
import { Urbit } from "@uqbar/react-native-api";
import { windowWidth, windowHeight, scryFrequency } from "./src/common/constants";
import { fetchDesk } from "./src/data/desks";
require("setimmediate");

const scryAll = (store) => () => {
	console.log(window._disableScry);
	store._endpoints.map((endpoint) => {
		if (endpoint.type === "scry" && !window._disableScry) {
			// if (endpoint.type === "scry" && endpoint.data === null) {
			scry(store._endpoints, endpoint.desk, endpoint.id, endpoint.name, "");
		}
	});
};

export default function App() {
	const {
		_newStore,
		_loading,
		_setUrbit,
		_urbit,
		_setLoading,
		mode,
		_addDesk,
		_scryAll,
	} = useStore();
	const store = useStore((s) => s);
	console.log(store);
	const desks = getData(
		store._endpoints,
		"dimension",
		"dimension-0.0.1",
		"sDesks"
	);
	useEffect(() => {
		_setUrbit();
		window._disableScry = false;
		scry(store._endpoints, "dimension", "dimension-0.0.1", "sDimensions", "");
		scry(store._endpoints, "dimension", "dimension-0.0.1", "sDesks", "");
		// setInterval(_scryAll, scryFrequency);
		['hitler'].map(desk => fetchDesk(_addDesk, desk));
		// setTimeout(_scryAll, scryFrequency);
	}, []);
	// store._scryAll;

	// if (desks !== null)
	// 	desks.map((desk) => {
	// 		if (
	// 			store._endpoints.filter((endpoint) => {
	// 				if (desk === endpoint.desk) return true;
	// 				return false;
	// 			})[0] === undefined
	// 		) {
	// 			fetchDesk(_addDesk, desk);
	// 		}
	// 	});

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
