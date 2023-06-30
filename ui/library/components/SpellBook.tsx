import { StyleSheet, Text, View, Image, Button, FlatList } from "react-native";
import { windowWidth, windowHeight } from "../../src/common/constants";
import { useStore, scryAll } from "../../src/common/store";
import declare from "../declare";
import {getCurrentDimension} from "../../src/common/utils";
import { expandComponent } from '../utils';

const SpellBook = (props) => {

	return (
		<View>
			<Text>Hello</Text>
		</View>
	);
};

export default expandComponent([], SpellBook);
