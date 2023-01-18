import React, { useState, useEffect, Component, useContext } from "react";
import selectWidget from "./widgets";
import logo from "./logo.svg";
import Urbit from "@urbit/http-api";
import ContextMenu from "./ContextMenu";
import useStore from "./store";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
	Link,
} from "react-router-dom";

// const dashboard = {
// 	name: "testboard",
// 	// modes: view/edit
// 	widgets: [
// 		{
// 			type: "fundlist",
// 			coordinates: {
// 				x: "11",
// 				y: "11",
// 				w: "11",
// 				h: "11",
// 			},
// 			attributes: [],
// 		},
// 		{
// 			type: "newfund",
// 			coordinates: {
// 				x: "11",
// 				y: "11",
// 				w: "11",
// 				h: "11",
// 			},
// 			attributes: [],
// 		},
// 		{
// 			type: "fund",
// 			coordinates: {
// 				x: "11",
// 				y: "11",
// 				w: "11",
// 				h: "11",
// 			},
// 			attributes: [{ fundID: "0x123" }],
// 		},
// 	],
// };

// const dashboards = [dashboard];

const Dashboard = (props) => {
	const { name } = useParams();
	const dashboards = useStore((state) => state.dashboards);
	const dashboard = dashboards.filter((d) => d.name === name)[0];
	console.log(dashboard);
	const setContextData = useStore((state) => state.setContextData);
	if (dashboard !== undefined)
		return (
			<div
				onContextMenu={(e) => {
					e.preventDefault();
					setContextData({ xPos: e.pageX, yPos: e.pageY, showMenu: true });
				}}
				onClick={(e) => {
					setContextData({ xPos: e.pageX, yPos: e.pageY, showMenu: false });
				}}
			>
				<ContextMenu/>
				{dashboard.widgets.map((w) => {
					console.log(w);
					return (
					<div> {selectWidget(w)}</div>
				)})}
			</div>
		);
	else return <div> dashboard does not exist! </div>;
};

class App extends Component {
	constructor(props) {
		super(props);

		window.urbit = new Urbit(
			"http://localhost:8080",
			"",
			"lidlut-tabwed-pillex-ridrup"
		);
		window.urbit.ship = "zod";

		// window.urbit = new Urbit("");
		// window.urbit.ship = window.ship;

		window.urbit.onOpen = () => this.setState({ conn: "ok" });
		window.urbit.onRetry = () => this.setState({ conn: "try" });
		window.urbit.onError = () => this.setState({ conn: "err" });
	}
	render() {
		// TODO router
		// '/' dashboard selector/create new dashboard
		// '/{dashboard-name} navigate to the selected dashboard

		return (
			<Routes>
				<Route path="/" element={<div>hello</div>} />
				<Route path="/:name" element={<Dashboard />} />
			</Routes>
		);
	}
}

export default App;
