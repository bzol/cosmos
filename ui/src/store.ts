import UrbitHttpApi from "@urbit/http-api";
import { create } from "zustand";
import { Urbit} from "@uqbar/react-native-api";
import { configureApi } from "@uqbar/react-native-api/configureApi";
import WebUrbit from "@urbit/http-api";
import declare from "../library/declare";
import { isWeb } from "./constants";
import { isMocking, mockStore } from "./mockstore";
import { visualStore } from "./visuals/store";

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
const scry = (app, path, callback) => () => {
	if (window._urbit !== undefined) {
		window._urbit
			.scry({
				app,
				path,
			})
			.then((s) => {
				callback(s);
				// setTimeout(scry(app, path, callback), 10000);
			})
			.catch(console.error);
	}
};

const transformInterface = (set, ifaceKey, iface) => {
	let transformedInterface = {};
	for (const key in iface) {
		if ("mark" in iface[key]) {
			transformedInterface[key] = iface[key];
			transformedInterface[key]["poke"] = (json) =>
				poke(
					ifaceKey,
					iface[key].mark,
					json,
					() => {},
					() => {}
				);
		}
		if ("path" in iface[key]) {
			const callback = (res) => {
				let obj = {};
				obj[ifaceKey] = iface;
				obj[ifaceKey][key]["data"] = res;
				obj[ifaceKey]["__scry_" + key] = scry(
					ifaceKey,
					iface[key].path,
					callback
				);
				set(obj);
			};
			transformedInterface[key] = iface[key];
			// transformedInterface[key] = null;
			// transformedInterface[key]['data'] = null;
			transformedInterface[key + "__scry_"] = () =>
				scry(ifaceKey, iface[key].path, callback)();
		}
	}
	return transformedInterface;
};

const generateStore = (set, declare) => {
	let api = {};
	for (const key in declare.api) {
		api[key] = transformInterface(set, key, declare.api[key]);
		// api = { ...api, ...transformInterface(key, declare.api[key]) };
	}
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
						const _urbit = new Urbit(
							"http://localhost:8080",
							"ropnys-batwyd-nossyt-mapwet",
							"collective",
							"nec"
						);
						window._urbit = _urbit;
					}
					else {
						console.log('not web!!!!');
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
		...visualStore(set),
		...api,
	};
};

export const scryAll = (store) => () => {
	for (const key in store) {
		if (!key.startsWith("_")) {
			for (const __scry_ in store[key]) {
				if (__scry_.includes("__scry_")) {
					store[key][__scry_]();
				}
			}
		}
	}
	// setTimeout(scryAll(store), 1000);
};

// export const initialize = async (declare) => {

// };

export const useStore = create((set, get) => generateStore(set, declare));
