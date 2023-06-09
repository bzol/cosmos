import { StyleSheet, Text, View, Image, Button } from "react-native";

const Create = (props) => {
	const { sDashboards } = props;
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
export default Create;
