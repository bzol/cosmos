import UrbitHttpApi from "@urbit/http-api";
import { create } from "zustand";
import { Platform } from "react-native";
import { configureApi } from "@uqbar/react-native-api/configureApi";
import WebUrbit from "@urbit/http-api";
import declare from "./declare";

const keyboardOffset = Platform.OS === "ios" ? 46 : 82;
const isIos = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";
const isWeb = Platform.OS === "web";
const keyboardAvoidBehavior = isIos ? "padding" : undefined;

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
		console.log(app);
		console.log(path);
		window._urbit
			.scry({
				app,
				path
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
			transformedInterface[key]['poke'] = (json) =>
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
				obj[ifaceKey][key]['data'] = res;
				obj[ifaceKey]["__scry_" + key] = scry(
					ifaceKey,
					iface[key].path,
					callback
				);
				set(obj);
			};
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
			_setUrbit: () =>
				set((state) => {
					const _urbit = configureApi("nec", "http://localhost:8080");
					// const _urbit = new WebUrbit('','','collective');
					window._urbit = _urbit;
					return {
						_urbit,
					};
				}),
			_newStore: (
				store
			) =>
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
	console.log("hi");
	// setTimeout(scryAll(store), 5000);
};

// export const initialize = async (declare) => {

// };

export const useStore = create((set, get) => generateStore(set, declare));
// export const useStore = create((set, get) => {});
