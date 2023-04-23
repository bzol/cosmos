import { useEffect } from "react";
import { useAsync } from "react-async";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useStore, scryAll } from "./src/store";
import declare from "./library/declare";
import { bDashboard } from "./library/bundles/dashboard";
import { scryCharges } from "@urbit/api";
import { isLoading, getPS } from "./src/utils";
import { Loading, Inventory, SpellBook, Dashboard } from "./src/visuals";
import { Urbit } from "@uqbar/react-native-api";
import { isMocking, mockStore } from "./src/mockstore";
import {GestureHandlerRootView} from "react-native-gesture-handler";
require("setimmediate");

export default function App() {
	const { _newStore, _loading, _setUrbit, _urbit, _setLoading, mode } =
		useStore();
	const store = useStore((s) => s);
	const dashboard = isMocking? {sDashboards: mockStore.dashboard.sDashboards.data} : getPS(bDashboard);
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
		const selectedDashboard = dashboard.sDashboards.filter((db) => {
			if (db.id === store._screen.id) return db;
			return false;
		})[0];
		return (
			<GestureHandlerRootView>
			<View style={styles.container}
			>
				{store._screen.type === "spellbook" && <SpellBook />}
				{store._screen.type === "inventory" && <Inventory />}
				{store._screen.type === "dashboard" && (
					<Dashboard dashboard={selectedDashboard} />
				)}
			</View>
			</GestureHandlerRootView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		width: 200,
		height: 200,
		// zIndex: 0,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
