import UrbitHttpApi from "@urbit/http-api";
import { create } from "zustand";
import { Urbit } from "@uqbar/react-native-api";
import { configureApi } from "@uqbar/react-native-api/configureApi";
import WebUrbit from "@urbit/http-api";
import declare from "../../library/declare";
import { isMocking, mockStore } from "./mockstore";
import { cc } from "./utils";
import {
	windowWidth,
	windowHeight,
	isIos,
	isAndroid,
	drawerPullZone,
	isWeb,
} from "./constants";
import { setMouseAction, none, pan, zoom, openSpellBook, addPortal, dragPortal, changePortal, finishChangePortal, noPortal} from "../input/controls";
import { matrix } from "mathjs";
import { extractDesk } from "../data/desks";

const deskNames = ["hitler"];

const poke = (app, mark, json, onSuccess, onError) => {
	console.log(json);
	window._urbit.poke({
		app: app,
		mark: mark,
		json: json,
		onSuccess: onSuccess,
		onError: onError,
	});
};

const scry = (app, path, txt, callback) => {
	if (window._urbit !== undefined) {
		window._urbit
			.scry({
				app,
				path,
			})
			.then((s) => {
				console.log(s);
				callback(s);
				// setTimeout(scry(app, path, callback), 10000);
			})
			.catch(console.error);
	}
};

export const visualStore = (set) => ({
	// STATE
	_currentDimension: "testdimension",
	_mouseAction: "_none",
	_mouseActionPortal: "_noPortal",
	_camera: matrix([0, 0, 1]),
	_tMatrix: matrix([
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	]),
	_tmpPortal: "none",
	_spellBook: {visible:false, 
		tMatrix: matrix([
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1],
		]),
		center: {x: 0, y:0}},
	// CONTROLS
	_setMouseAction: setMouseAction(set),
	_openSpellBook: openSpellBook(set),
	_addPortal: addPortal(set),
	_none: none(set),
	_pan: pan(set),
	_zoom: zoom(set),
	_noPortal: noPortal(set),
	_dragPortal: dragPortal(set),
	_changePortal: changePortal(set),
	_finishChangePortal: finishChangePortal(set),
});


const addComponents = (desk, components) => {
	let newComponents = [];
	desk.components.map((component) => {
		newComponents.push({ desk: declare.id, ...component });
	});
	return components.concat(newComponents);
};

const addEndpoints = (set, desk, endpoints) => {
	let newEndpoints = [];
	desk.apis.map((api) => {
		newEndpoints = newEndpoints.concat(transformAPI(set, desk, api));
	});
	return endpoints.concat(newEndpoints);
};

const transformAPI = (set, desk, api) => {
	let endpoints = [];
	api.endpoints.map((endpoint) => {
		if (endpoint.type === "poke") {
			endpoints.push({
				desk: desk.id,
				id: api.id,
				name: endpoint.name,
				type: endpoint.type,
				action: endpoint.action,
				endpoint: (json) => {
					let obj = {};
					obj[endpoint.action] = json;
					poke(
						endpoint.app,
						endpoint.mark,
						obj,
						() => {},
						() => {}
					);
				},
			});
		} else if (endpoint.type === "scry") {
			endpoints.push({
				desk: desk.id,
				id: api.id,
				name: endpoint.name,
				type: endpoint.type,
				endpoint: (txt) =>
					scry(endpoint.app, endpoint.path, txt, (obj) => {
						set((s) => {
							return {
								_endpoints: s._endpoints.map((api2) => {
									if (
										api2.desk === desk.id &&
										api2.id === api.id &&
										api2.name === endpoint.name
									) {
										return { ...api2, data: obj };
									}
									return api2;
								}),
							};
						});
					}),
				data: null,
			});
		}
	});
	return endpoints;
};

const generateStore = (set, declare) => {
	let endpoints = [];
	let components = [];
	declare.components.map((component) => {
		components.push({ desk: declare.id, ...component });
	});
	declare.apis.map((api) => {
		endpoints = endpoints.concat(transformAPI(set, declare, api));
	});
	return {
		...{
			_loading: true,
			_needLogin: true,
			_ship: "",
			_shipUrl: "",
			_authCookie: "",
			_urbit: null,
			_setUrbit: () => {
				set((state) => {
					if (true) {
						// const _urbit = new Urbit(
						// 	"",
						// 	"",
						// 	"",
						// 	""
						// );
						const _urbit = new Urbit(
							"http://localhost:8080",
							"ropnys-batwyd-nossyt-mapwet",
							"cosmos",
							"nec"
						);
						window._urbit = _urbit;
					} else {
						const _urbit = configureApi("nec", "http://192.168.1.38:8080");
						window._urbit = _urbit;
					}

					return {
						_urbit,
					};
				});
			},
			_setLoading: (val) => set((s) => ({ _loading: val })),
			_newStore: (store) =>
				set((state) => {
					return store;
				}),
		},
		_endpoints: addEndpoints(set, declare, []),
		_components: addComponents(declare, []),
		_addDesk: (desk) => {
			set((state) => {
				return {
					_components: addComponents(desk, state._components),
					_endpoints: addEndpoints(set, desk, state._endpoints),
				};
			});
		},
		...visualStore(set),
	};
};

export const useStore = create((set, get) => generateStore(set, declare));
