import * as R from "ramda";
import create from "zustand";
import collective from "./library/logic/collective";
import multisig from "./library/logic/multisig";
import produce from "immer";
import { createStore, getDashboardIdx, poke, subscribe } from "./utils";
import _ from "lodash";

const main = (set) => {
	return {
		mode: "view",
		setMode: (mode) => set((state) => ({ mode })),
		maximized: "",
		setMaximized: (maximized) => set((state) => ({ maximized })),
		contextData: { xPos: 0, yPos: 0, showMenu: false },
		setContextData: (data) => set((state) => ({ contextData: data })),
		onBorder: null,
		setOnBorder: (data) => set((state) => ({ onBorder: data })),
		tmpWidgets: [],
		setTmpWidgets: (data) => set((state) => ({ tmpWidgets: data })),
		//
		dashboards: [
			// {
			// 	id: "testboard",
			// 	widgets: [
			// 		{
			// 			id: "fundlist_0",
			// 			type: "fundlist",
			// 			coordinates: {
			// 				x: 50,
			// 				y: 100,
			// 				w: 50,
			// 				h: 50,
			// 			},
			// 			attributes: {},
			// 		},
			// 		{
			// 			id: "newfund_0",
			// 			type: "newfund",
			// 			coordinates: {
			// 				x: 200,
			// 				y: 200,
			// 				w: 50,
			// 				h: 50,
			// 			},
			// 			attributes: {},
			// 		},
			// 		{
			// 			id: "fund_0",
			// 			type: "fund",
			// 			coordinates: {
			// 				x: 300,
			// 				y: 300,
			// 				w: 50,
			// 				h: 50,
			// 			},
			// 			attributes: { fundID: "0x123" },
			// 		},
			// 	],
			// },
		],
		//
		addWidget: (type) =>
			set(
				produce((draft) => {
					const dashboardIdx = getDashboardIdx(draft.dashboards);
					const countSameType = (widgets) =>
						widgets.filter((w) => w.type === type).length;
					draft.dashboards[dashboardIdx].widgets.push({
						id:
							type +
							"_" +
							countSameType(draft.dashboards[dashboardIdx].widgets),
						type,
						coordinates: {
							x: draft.contextData.xPos,
							y: draft.contextData.yPos,
							w: 200,
							h: 200,
						},
						attributes: {},
					});
				})
			),
		setWidgetAttribute: (id, attribute) =>
			set(
				produce((draft) => {
					const dashboardIdx = getDashboardIdx(draft.dashboards);
					const widgetID = draft.dashboards[dashboardIdx].widgets.findIndex(w => w.id === id);
					draft.dashboards[dashboardIdx].widgets[widgetID].attributes = {...attribute};
					// draft.dashboards[dashboardIdx].widgets[widgetID] = {};
				})
			),
		updateWidgetCoordinates: (widgets) =>
			set(
				produce((draft) => {
					const dashboardIdx = getDashboardIdx(draft.dashboards);
					draft.dashboards[dashboardIdx].widgets = widgets;
				})
			),
		updateDashboard: (dashboard) => {},
		pSync: (dashboard, del) => {
			const { id, ...modifiedDashboard } = dashboard;
			const modifiedWidgets = dashboard.widgets.reduce((acc, curr) => {
				return {
					...acc,
					[curr.id]: {
						type: curr.type,
						coordinates: curr.coordinates,
						attributes: curr.attributes,
					},
				};
			}, {});
			poke("dashboard", "dashboard-action", {
				sync: {
					id,
					dashboard: {
						widgets: modifiedWidgets,
					},
					delete: del,
				},
			});
		},
		sClient: (handler) => {
			subscribe("dashboard", "/client", (client) => {
				set((state) => ({
					dashboards: client,
				}));
			});
		},
	};
};

const useStore = createStore([main, collective, multisig]);

export default useStore;
