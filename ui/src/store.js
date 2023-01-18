import * as R from "ramda";
import create from "zustand";
import collective from "./library/logic/collective";
import produce from "immer";
import { createStore } from "./utils";
import _ from 'lodash';


const main = (set) => {
	return {
		mode: "view",
		setMode: (mode) => set((state) => ({ mode })),
		contextData: { xPos: 0, yPos: 0, showMenu: false },
		setContextData: (data) => set((state) => ({ contextData: data })),
		//
		dashboards: [
			{
				name: "testboard",
				widgets: [
					{
						type: "fundlist",
						coordinates: {
							x: 0,
							y: 0,
							w: 50,
							h: 50,
						},
						attributes: [],
					},
					{
						type: "newfund",
						coordinates: {
							x: 0,
							y: 0,
							w: 50,
							h: 50,
						},
						attributes: [],
					},
					{
						type: "fund",
						coordinates: {
							x: 0,
							y: 0,
							w: 50,
							h: 50,
						},
						attributes: [{ fundID: "0x123" }],
					},
				],
			},
		],
		addWidget: (type) =>
			set(
				produce((draft) => {
					const dashboardName =
						window.location.href.split("/")[
							window.location.href.split("/").length - 1
						];
					const dashboardIdx = draft.dashboards.findIndex(
						(d) => d.name === dashboardName
					);
					draft.dashboards[dashboardIdx].widgets.push({
						type,
						coordinates: {
							x: draft.contextData.xPos,
							y: draft.contextData.yPos,
							w: 50,
							h: 50,
						},
						attributes: [],
					});
					console.log(draft);
				})
			),
	};
};

const useStore = createStore([main, collective]);

export default useStore;
