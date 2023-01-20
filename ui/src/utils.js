import React, { useState, useEffect, Component, useContext } from "react";
import * as R from "ramda";
import create from "zustand";
import widgetLibrary from "./widgets";
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
export const createWidget = R.curry((params, widget) => {
	const Layout = widgetLibrary.filter((w) => w.type === widget.type)[0]
		.component;

	const [x, y, w, h] =
		params.maximized === widget.id
			? [0, 0, "100%", "100%"]
			: [
					widget.coordinates.x,
					widget.coordinates.y,
					widget.coordinates.w,
					widget.coordinates.h,
			  ];
	const border = params.mode === "edit" ? "10px solid red" : "1px solid green";

	return (
		<div class="fixed" style={{ left: x, top: y, width: w, height: h, border }}>
			{params.mode === "view" && <Layout attributes={widget.attributes} />}
			{params.mode === "edit" && <Layout attributes={widget.attributes} />}
		</div>
	);
});

const border = 10;

export const calculateOnBorder = (widgets, xPos, yPos) => {
	const borderTouched = widgets.map((widget) => {
		const c = widget.coordinates;
		const xBorder =
			yPos >= c.y && yPos < c.y + border
				? "top"
				: yPos >= c.y + c.h - border && yPos < c.y + c.h
				? "bottom"
				: "";
		const yBorder =
			xPos >= c.x && xPos < c.x + border
				? "left"
				: xPos >= c.x + c.w - border && xPos < c.x + c.w
				? "right"
				: "";
		if ( xBorder + yBorder !== '')
			return {id: widget.id, border: xBorder + yBorder};
		else if( xPos >= c.x && xPos < c.x + c.w && yPos >= c.y && yPos < c.y + c.h)
			return {id: widget.id, border: 'middle'};
		else
			return {id: widget.id, border: ''};
	}).filter(b => b.border !== '')[0];
	console.log(borderTouched);
	if (borderTouched !== undefined)
		return borderTouched;
	return null;
};

export const calculateCoordinates = (widget, onBorder, xPos, yPos) => {
	const c = widget.coordinates;
	if(onBorder.id !== widget.id)
		return {...widget};
	switch (onBorder.border) {
		case "topleft":
			return (
				{
					...widget,
					coordinates: {
						x: xPos,
						y: yPos,
						w: c.w + (xPos - c.x),
						h: c.h + (c.y - yPos),
					},
				}
			);
		case "top":
			return {
				...widget,
				coordinates: {
					x: c.x,
					y: yPos - border,
					w: c.w,
					h: c.h + (c.y - yPos) + border,
				},
			};
		case "topright":
			return {
				...widget,
				coordinates: {
					x: c.x,
					y: yPos,
					w: (xPos - c.x),
					h: c.h + (c.y - yPos),
				},
			};
		case "right":
			return {
				...widget,
				coordinates: {
					x: c.x,
					y: c.y,
					w: (xPos - c.x),
					h: c.h,
				},
			};
		case "bottomright":
			return {
				...widget,
				coordinates: {
					x: c.x,
					y: c.y,
					w: (xPos - c.x),
					h: yPos - c.y,
				},
			};
		case "bottom":
			return {
				...widget,
				coordinates: {
					x: c.x,
					y: c.y,
					w: c.w,
					h: yPos - c.y,
				},
			};
		case "bottomleft":
			return {
				...widget,
				coordinates: {
					x: xPos,
					y: c.y,
					w: c.w + (c.x - xPos),
					h: yPos - c.y,
				},
			};
		case "left":
			return {
				...widget,
				coordinates: {
					x: xPos,
					y: c.y,
					w: c.w + (c.x - xPos),
					h: c.h, 
				},
			};
	}
	return { ...widget, onBorder: "" };
};

export const getDashboardIdx = (dashboards) => {
	const dashboardName =
		window.location.href.split("/")[window.location.href.split("/").length - 1];
	const dashboardIdx = dashboards.findIndex((d) => d.id === dashboardName);
	return dashboardIdx;
};
