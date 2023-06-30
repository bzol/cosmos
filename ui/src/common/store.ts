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
import { setMouseAction, none, pan, zoom, portal } from "../input/controls";
import { matrix } from "mathjs";

const poke = (app, mark, json, onSuccess, onError) => {
	cc(json, "poke");
	window._urbit.poke({
		app: app,
		mark: mark,
		json: json,
		onSuccess: onSuccess,
		onError: onError,
	});
};

const scry = (app, path, txt, callback) => {
					console.log('scry-function', window._urbit);
					console.log(window._urbit);
	if (window._urbit !== undefined) {
					cc('scryrfunctione3');
		window._urbit
			.scry({
				app,
				path,
			})
			.then((s) => {
				callback(s);
					cc('scry-function2');
				// setTimeout(scry(app, path, callback), 10000);
			})
			.catch(console.error);
	}
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
				endpoint: (json) => {
					poke(
						endpoint.app,
						endpoint.mark,
						json,
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
				endpoint: (txt) => scry(endpoint.app, endpoint.path, txt, (obj) => {
					cc("scry set data");
					set((s) => {
						return { _apis: s._apis };
					});
				}),
				data: null,
			});
		}
	});
	console.log(endpoints);
	return (endpoints);
};

const generateStore = (set, declare) => {
	let apis = [];
	let components = [];
	cc(declare.apis);
	const desks = [declare];
	desks.map((desk) => {
		desk.components.map((component) => {
			components.push(component.component);
		});
		desk.apis.map((api) => {
			console.log(transformAPI(set, desk, api));
			apis = apis.concat(transformAPI(set, desk, api));
		});
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
						console.log("not web!!!!");
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
		_apis: apis,
		_components: components,
		...visualStore(set),
	};
};

// export const scryAll = (store) => () => {
// 	for (const key in store) {
// 		if (!key.startsWith("_")) {
// 			for (const __scry_ in store[key]) {
// 				if (__scry_.includes("__scry_")) {
// 					store[key][__scry_]();
// 				}
// 			}
// 		}
// 	}
// 	// setTimeout(scryAll(store), 1000);
// };

export const visualStore = (set) => ({
	// STATE
	_currentDimension: "testdimension",
	_mouseAction: "_none",
	_camera: matrix([10, 0, 1]),
	_tMatrix: matrix([
		[1, 0, 0],
		[0, 1, 0],
		[0, 0, 1],
	]),
	_tmpPortal: "none",
	// CONTROLS
	_setMouseAction: setMouseAction(set),
	_none: none(set),
	_pan: pan(set),
	_zoom: zoom(set),
	_portal: portal(set),
});

export const useStore = create((set, get) => generateStore(set, declare));
