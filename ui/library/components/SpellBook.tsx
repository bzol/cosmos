import { StyleSheet, Text, View, Image, Button, FlatList } from "react-native";
import { windowWidth, windowHeight } from "../../src/constants";
import { useStore, scryAll } from "../../src/store";
import declare from "../declare";

const Item = (props) => {
	console.log(props);
	const modifiedPortals = props.item.dashboard.portals.map((portal) => {
		if (portal.id === props.item.portal.id)
			return { ...props.item.portal, component: props.item.component };
		return portal;
	});
	console.log(modifiedPortals);
	return (
		<Button
			styles={styles.item}
			onPress={() => {
				props.item.pSync({
					sync: {
						id: props.item.dashboard.id,
						portals: modifiedPortals,
						delete: false,
					},
				});
				setTimeout(scryAll(props.item.store), 10);
			}}
		>
			{props.item.component}
		</Button>
	);
};

const SpellBook = (props) => {
	const { sDashboards, pSync } = props;
	const store = useStore((s) => s);
	console.log(props);
	const dashboard = sDashboards.filter((dashboard) => {
		if (dashboard.id === store._currentDashboard) return true;
		return false;
	})[0];
	const componentTypes = Object.keys(declare.components).map((component) => {
		return {
			component,
			portal: props.portal,
			dashboard,
			pSync,
			store,
		};
	});
	console.log(componentTypes);
	return (
		<View style={styles.container}>
			<Text>SpellBook</Text>
			<FlatList
				data={componentTypes}
				numColumns={4}
				renderItem={Item}
				keyExtractor={(item) => item.alt}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexWrap: "wrap",
		zIndex: 100,
		// flexShrink: 1,
		backgroundColor: "#b58900",
		alignItems: "center",
		justifyContent: "center",
	},
	item: {
		flex: 1,
		maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",

		// my visual styles; not important for the grid
		padding: 10,
		backgroundColor: "rgba(249, 180, 45, 0.25)",
		borderWidth: 1.5,
		borderColor: "#fff",
	},
});
export default SpellBook;
