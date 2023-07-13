import { StyleSheet, Text, View, Image, Button } from "react-native";

const SpellBook = (props) => {
	const coord = props.portalPosition;
	const fontSize = coord.width/7;
	return (
		<View style={styles.container}>
			<Text style={{fontSize}}>SpellBook</Text>
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
		// fontSize: 90
	},
});
export default {
	id: "SpellBook",
	wRatio: 1,
	hRatio: 1,
	apis: [{ desk: "diemnsion", id: "dimension-0.0.1" }],
	component: SpellBook,
};
