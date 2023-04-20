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

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;


export default function App() {
	const { _newStore, _loading, _setUrbit, _urbit, _setLoading, mode } =
		useStore();
	const store = useStore((s) => s);
	const dashboard = getPS(bDashboard);
	console.log(store);
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
		const selectedDashboard = dashboard.sDashboards.filter(db => {
			console.log(db);
			if(db.id === store._view.id)
				return db;
			return false;
		})[0];
		console.log(store._view.type);
		console.log(selectedDashboard);
		return (
			<View style={styles.container}>
				{ store._view.type === 'spellbook' && <SpellBook/> }
				{ store._view.type === 'inventory' && <Inventory/> }
				{ store._view.type === 'dashboard' && <Dashboard dashboard={selectedDashboard}/>
			}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: 'absolute',
		// width: 2000,
		// height: 2000,
		// zIndex: 0,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
