import { StyleSheet, Text, View } from "react-native";
import { windowWidth, windowHeight } from "./constants";
import declare from "../library/declare";
import { getPS, renameBundle, renameComponent } from "./utils";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const Loading = (store) => {
	return <Text>...Loading</Text>;
};

export const Inventory = (store) => {
	return <Text>Inventory</Text>;
};

export const SpellBook = (store) => {
	return (
		<View
			style={{
				// position: "absolute",
				top: 0,
				left: 0,
			}}
		>
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
				}}
			>
				hello
			</View>
			SpellBook
		</View>
	);
};

export const Portal = ({ portal }) => {
	const bundle = getPS(declare.bundles[renameBundle(portal.bundle)]);
	const Component = declare.components[renameComponent(portal.component)];

	// <View>
	// <View style={portalStyles.container}>
	return (
		<View style={portalStyles.container}>
			<Component {...bundle} />
		</View>
	);
};

{
	/* <TransformWrapper> */
}
{
	/* 	<TransformComponent> */
}
// </TransformComponent>
// </TransformWrapper>
export const Dashboard = ({ dashboard }) => {
	console.log(dashboard);
	return (
		<View style={dashboardStyles.container}>
			{dashboard.portals.map((portal) => {
				return <Portal portal={portal} />;
			})}
		</View>
	);
};

const dashboardStyles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'absolute',
		left: 0,
		top: 0,
		// bottom: 100,
		// right: 100,
		// zIndex: 100,
		backgroundColor: "#FF0000",
		alignItems: "center",
		justifyContent: "center",
	},
});

const portalStyles = StyleSheet.create({
	container: {
		// flex: 1,
		position: "absolute",
		left: 1900,
		top:  500,
		// bottom: 100,
		// right: 100,
		//
		// zIndex: 200,
		width: 200,
		height: 200,
		backgroundColor: "#00FF00",
		alignItems: "left",
		// justifyContent: "center",
	},
});
