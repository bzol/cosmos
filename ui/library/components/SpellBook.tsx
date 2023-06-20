import { StyleSheet, Text, View, Image, Button, FlatList } from "react-native";
import { windowWidth, windowHeight } from "../../src/constants";
import { useStore, scryAll } from "../../src/store";
import declare from "../declare";
import {getCurrentDashboard} from "../../src/utils";
import drawTriangle from './regl/Triangle';

const SpellBook = (props) => {
	const { sDashboards, pSync } = props;
	const store = useStore((s) => s);
	const dashboardPortals = getCurrentDashboard(store.dashboard, store._currentDashboard);


	const canvas = document.getElementById(props.portal.id);

	// const ctx = canvas ? canvas.getContext('2d') : null;
	// console.log(ctx);
	// const ctx = canvas.getContext("2d");
	// if(ctx) {
	// 	ctx.font = "90px Arial";
	// 	ctx.fillText("Hello World", 10, 50);
	// }

	return (
		<View>
			<canvas id={props.portal.id}>SpellBook</canvas>
		</View>
	);
};

export default SpellBook;
