import UrbitHttpApi from "@urbit/http-api";
import { create } from "zustand";
import { Urbit} from "@uqbar/react-native-api";
import { configureApi } from "@uqbar/react-native-api/configureApi";
import WebUrbit from "@urbit/http-api";
import declare from "../library/declare";
import { isWeb } from "./constants";

const poke = (app, mark, json, onSuccess, onError) => {
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
			_setLoading: (x) => set((s) => ({ _loading: x })),
			_needLogin: true,
			_ship: "",
			_shipUrl: "",
			_authCookie: "",
			_urbit: null,
			_view: { type: "dashboard", id: "hood" },
			_setUrbit: () => {
				// console.log(Urbit);
				// Urbit.authenticate({ship:'nec', url:"http://localhost:8080", desk:'collective', code: "ropnys-batwyd-nossyt-mapwet"});
				// 	const _urbit = res;
				// 	window._urbit = res;
				// 	console.log(res);
				// 	console.log('hello');
				// 	set(s => {_urbit});
				// }).catch(err => console.log(err));
				set((state) => {
					// const _urbit = configureApi("nec", "http://localhost:8080");
					if (true) {
						const _urbit = new Urbit(
							"http://localhost:8080",
							"ropnys-batwyd-nossyt-mapwet",
							"collective",
							"nec"
						);
						// console.log(newUrbit);
						// const _urbit = new WebUrbit('','','collective');
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
	// setTimeout(scryAll(store), 5000);
};

// export const initialize = async (declare) => {

// };

export const useStore = create((set, get) => generateStore(set, declare));
// export const useStore = create((set, get) => {});