import React, { useState, useEffect, Component, useContext } from "react";
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
import { createWidget, calculateCoordinates, calculateOnBorder } from "./utils";

const Dashboard = (props) => {
	const { id } = useParams();
	const mode = useStore((state) => state.mode);
	const setMode = useStore((state) => state.setMode);
	const maximized = useStore((state) => state.maximized);
	const setMaximized = useStore((state) => state.setMaximized);
	const dashboards = useStore((state) => state.dashboards);
	const dashboard = dashboards.filter((d) => d.id === id)[0];
	const setContextData = useStore((state) => state.setContextData);
	const onBorder = useStore((state) => state.onBorder);
	const setOnBorder = useStore((state) => state.setOnBorder);
	const tmpWidgets = useStore((state) => state.tmpWidgets);
	const setTmpWidgets = useStore((state) => state.setTmpWidgets);
	const updateWidgetCoordinates = useStore(
		(state) => state.updateWidgetCoordinates
	);

	if (dashboard !== undefined)
		return (
			<div
				class="h-full w-full"
				onContextMenu={(e) => {
					e.preventDefault();
					setContextData({ xPos: e.pageX, yPos: e.pageY, showMenu: true });
				}}
				onMouseDown={(e) => {
					// console.log(dashboards);
					setOnBorder(
						calculateOnBorder(dashboard.widgets, e.clientX, e.clientY)
					)
					setTmpWidgets(dashboard.widgets);
				}
				}
				onMouseUp={(e) => {
					setOnBorder(null)
					setTmpWidgets(null);
				}}
				onMouseMove={(e) => {
					if (mode === "edit" && onBorder !== null && e.buttons === 1) {
						updateWidgetCoordinates(
							tmpWidgets.map((widget) => {
								return calculateCoordinates(
									widget,
									onBorder,
									e.clientX,
									e.clientY
								);
							})
						);
					}
				}}
				onClick={(e) => {
					setContextData({ xPos: e.pageX, yPos: e.pageY, showMenu: false });
				}}
			>
				<ContextMenu />
				{dashboard.widgets.map((w) => {
					return createWidget({ mode, setMode, maximized, setMaximized }, w);
				})}
			</div>
		);
	else return <div> dashboard does not exist! </div>;
};

const Main = (props) => {
	const dashboards = useStore((state) => state.dashboards);
	const pSync = useStore((state) => state.pSync);
	const [name, setName] = useState("");
	return (
		<div>
			<div>
				<input
					class="p-3 w-10/12 border-stone-400"
					value={name}
					placeholder={"enter the name of the new dashboard"}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<button
					onClick={() => {
						pSync({ id: name, widgets: [] }, false);
					}}
				>
					Create
				</button>
			</div>
			<table>
				<tr>
					<th>Name</th>
					<th>Open</th>
					<th>Delete</th>
				</tr>
				{dashboards.map((d) => {
					return (
						<tr>
							<td>{d.id}</td>
							<td>
								<Link to={"/" + d.id} target="_blank" rel="noopener noreferrer">Open</Link>
							</td>
							<td>
								<button
									onClick={() => {
										pSync(d, true);
									}}
								>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
};

const AppSwitch = (props) => {
	const collective_sClient = useStore((state) => state.collective_sClient);
	const multisig_sClient = useStore((state) => state.multisig_sClient);
	const sClient = useStore((state) => state.sClient);

	useEffect(() => {
		multisig_sClient();
		// collective_sClient();
		sClient();
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/:id" element={<Dashboard />} />
		</Routes>
	);
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
		return <AppSwitch />;
	}
}

export default App;
