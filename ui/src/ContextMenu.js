import React, { useState, useEffect, Component, useContext } from "react";
import widgetLibrary from "./widgets";
import useStore from "./store";
import { getDashboardIdx } from "./utils";

// document.addEventListener("contextmenu", (event) => {
// 	event.preventDefault();
// 	console.log("hello");
// 	const xPos = event.pageX + "px";
// 	const yPos = event.pageY + "px";
// 		const mode = useStore(state => state.mode);
// 	console.log(mode);
// });

const ContextMenu = () => {
	const mode = useStore((state) => state.mode);
	const setMode = useStore((state) => state.setMode);
	const dashboards = useStore((state) => state.dashboards);
	const contextData = useStore((state) => state.contextData);
	const addWidget = useStore((state) => state.addWidget);
	const pSync = useStore((state) => state.pSync);
	if (contextData.showMenu)
		return (
			<ul
				className="z-40"
				style={{
					top: contextData.yPos,
					left: contextData.xPos,
					position: "fixed",
				}}
			>
				{mode === "view" && (
					<li
						onClick={() => {
							setMode("edit");
						}}
					>
						{" "}
						Edit{" "}
					</li>
				)}
				{mode === "edit" && (
					<div>
						<li
							onClick={() => {
								setMode("view");
								const dashboardIdx = getDashboardIdx(dashboards);
								pSync(dashboards[dashboardIdx], false);
							}}
						>
							{" "}
							Save{" "}
						</li>
						{widgetLibrary.map((w) => (
							<li
								onClick={() => {
									if (mode === "edit") {
										addWidget(w.type);
									}
								}}
							>
								{w.type}
							</li>
						))}
					</div>
				)}
			</ul>
		);
	else return null;
};

export default ContextMenu;
