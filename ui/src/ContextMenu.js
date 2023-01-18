import React, { useState, useEffect, Component, useContext } from "react";
import { widgets } from "./widgets";
import useStore from "./store";

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
	const setMode = useStore(state => state.setMode);
	const contextData = useStore((state) => state.contextData);
	const addWidget = useStore((state) => state.addWidget);
	if (contextData.showMenu)
		return (
			<ul
				className="menu"
				style={{
					top: contextData.yPos,
					left: contextData.xPos,
					position: "absolute",
				}}
			>
				{mode === "view" && <li
					onClick = {() => {setMode('edit')}}
				> Edit </li>}
				{mode === "edit" && (
					<div>
						<li
						onClick = {() => {setMode('view')}}
						> Save </li>
						{widgets.map( w => <li
							onClick = { () => {
								if(mode === 'edit') {
									addWidget(w.type);
								}
							}}
						>{w.type}</li> )}
					</div>
				)}
			</ul>
		);
	else return null;
};

export default ContextMenu;
