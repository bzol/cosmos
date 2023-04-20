import {StyleSheet, Text, View} from "react-native";

const Create = (props) => {
	const {sDashboards} = props;
	return <View style={styles.container}><Text {...props}>hlkgjdhfjkdljgdklgjdklgjdlfjdklfjsklfjdsklfjdklsjdlkjfdlksjfsdkljfjdklfjsdkl</Text></View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// position: 'absolute',
		backgroundColor: "#00FF00",
		alignItems: "center",
		justifyContent: "center",
	},
});
export default Create;
