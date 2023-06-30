import { StyleSheet, Text, View, Image, Button } from "react-native";

const Create = (props) => {
	const data = props.data;
	return (
		<View 
			style={styles.container}
		>
			<Text>Create</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: 'absolute',
		flexWrap: "wrap",
		zIndex: 100,
		// flexShrink: 1,
		backgroundColor: "#b58900",
		alignItems: "center",
		justifyContent: "center",
	},
});
export default {
	id: 'Create',
	apis: [
	{desk: 'hitler', id:'api1-0.0.1'},
	{desk: 'hitler', id:'api2-0.0.1'}
	],
	component: Create };

