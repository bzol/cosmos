import { useEffect } from "react";
import { useAsync } from "react-async";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useStore, scryAll } from "./store";
import declare from "./declare";
import { bDashboard } from "./bundles/dashboard";
import { scryCharges } from "@urbit/api";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getPS } from "./utils";


export default function App() {
	const { _newStore, _setUrbit, _urbit, _setLoading, mode } = useStore();
	const store = useStore(s => s);
	// const dashboards = getPS(bDashboard);
	const dashboards = {};
	console.log(store);
	useEffect(() => {
		_setUrbit();

		setTimeout(scryAll(store), 1000);
	}, []);
	if (!_urbit) {
		return (
			<View style={styles.container}>
				<Text>...Loading</Text>
			</View>
		);
	} else {
		// console.log(
		// 	dashboard.action1({
		// 		sync: { id: "123", dashboard: { widgets: [], delete: false } },
		// 	})
		// );
		return (
			<View style={styles.container}>
				<TransformWrapper>
      		<TransformComponent>
			<View >
				<Text>Open up App.tsx to start working on your app!</Text>
				<Text>Open up App.tsx to start working on your app!</Text>
			</View>
				<StatusBar style="auto" />
      		</TransformComponent>
				</TransformWrapper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
