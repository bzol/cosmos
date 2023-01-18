import React, { useState, useEffect, Component, useContext } from "react";
import * as R from "ramda";
import create from "zustand";
import selectWidget from "./widgets";
import useStore from "./store";
export const createPage = (currentRoute, pageRoute, component) => {};

export const poke = R.curry((app, mark, json) => {
	console.log("new poke=====");
	console.log(app);
	console.log(mark);
	console.log(json);
	console.log("=============");
	window.urbit.poke({
		app: app,
		mark: mark,
		json: json,
		// onSuccess: () => {},
		// onError: () => {},
	});
});

export const subscribe = R.curry((app, path, handler) => {
	window.urbit.subscribe({
		app: app,
		path: path,
		event: handler,
	});
});

// export const createComponent = (component, style, state, actions) => <component/>);
// export const createComponent = (component, style, state, action) => <component {...test}/>);

export const createStore = (logicModules) =>
	create((set) => R.mergeAll(logicModules.map((x) => x(set))));

export const unit = (str) => {
	if (str === "~") {
		return null;
	}
	return str;
};

export const dedup = (attr, arr) => {
	return [...new Map(arr.map((a) => [a[attr], a])).values()];
};

// make widget resizable
export const createWidget = (Layout) => {
	return (widget) => {
		const mode = useStore((state) => state.mode);
		const setMode = useStore((state) => state.setMode);
		return (
			<div>
				{mode === "view" && (
					<div className="resizer">
						hello
						<button onClick={() => setMode("edit")}> clickme </button>
						<Layout attributes={widget.attributes} />
					</div>
				)}
				{mode === "edit" && (
					<div className="resizer">
						goodbye
						<Layout attributes={widget.attributes} />
					</div>
				)}
			</div>
		);
	};
};
