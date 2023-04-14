import UrbitHttpApi from "@urbit/http-api";
import { create } from "zustand";
import { Platform } from "react-native";
import { configureApi } from "@uqbar/react-native-api/configureApi";
import WebUrbit from "@urbit/http-api";
import declare from "./declare";
// import Urbit from '@uqbar/react-native-api';

const keyboardOffset = Platform.OS === "ios" ? 46 : 82;
const isIos = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";
const isWeb = Platform.OS === "web";
const keyboardAvoidBehavior = isIos ? "padding" : undefined;

const poke = (app, mark, json, onSuccess, onError) => {
	window.urbit.poke({
		app: app,
		mark: mark,
		json: json,
		onSuccess: onSuccess,
		onError: onError,
	});
};

// TODO push poke error to a window.pokeErrors array, and scry errors and waits to a window.scryErrors

const transformInterface = (ifaceKey, iface) => {
	let transformedInterface = {};
	for (const key in iface) {
		if ("app" in iface[key]) {
			transformedInterface[key] = (json) =>
				poke(
					iface[key].app,
					iface[key].mark,
					json,
					() => {},
					() => {}
				);
		}
		if ("path" in iface[key]) {
			transformedInterface[key] = null;
		}
	}
	return transformedInterface;
};

// export default function (declare) {
// 	// window.urbit.onOpen = () => this.setState({ conn: "ok" });
// 	// window.urbit.onRetry = () => this.setState({ conn: "try" });
// 	// window.urbit.onError = () => this.setState({ conn: "err" });

// 	const store = (set) => {
// 		console.log(ret);
// 		return ret;
// 	};

// 	// const scryres = window.urbit.scry({app: 'azimuth'})
// 	return store;
// }
const generateStore = (set, declare) => {
	let api = { mode: "view" };
	for (const key in declare.api) {
		api[key] = transformInterface(key, declare.api[key]);
		// api = { ...api, ...transformInterface(key, declare.api[key]) };
	}
	return {
		...{
			_loading: true,
			_setLoading: (x) => set(s => ({ _loading:x})),
			_needLogin: true,
			_ship: "",
			_shipUrl: "",
			_authCookie: "",
			_urbit: null,
			_setUrbit: () =>
				set((state) => ({
					_urbit: configureApi("nec", "http://localhost:8080"),
				})),
		},
		...api
	};
};

// export default function (declare) {

// 	return
// 	create((set) => generateStore(set, declare.api));

// loading: true,
// needLogin: true,
// ship: '',
// shipUrl: '',
// authCookie: '',
// ships: [],
// api: null,
// webViewRef: null,
// // setNeedLogin: (needLogin: boolean) => set(() => ({ needLogin })),
// loadStore: (store: any) => set(() => {
//   const api = initializeApi(store.ship, store.shipUrl);

//   return { ...store, api };
// }),
// setShipUrl: (shipUrl: string) => set({ shipUrl }),
// setLoading: (loading: boolean) => set({ loading }),
// addShip: (shipConnection: ShipConnection) => set((store) => {
//   const { ship } = shipConnection;
//   const api = initializeApi(shipConnection.ship, shipConnection.shipUrl);
//   const newStore: any = getNewStore(store, shipConnection.ship, { ...shipConnection, ship: `~${deSig(ship)}` }, api as any);

//   storage.save({ key: 'store', data: newStore });
//   return newStore;
// }),
// removeShip: (oldShip: string) => set(({ ships }: any) => {
//   const newShips = ships.filter(({ ship }: any) => ship !== oldShip)
//   const firstShip = newShips[0];

//   const newStore = {
//     ships: newShips,
//     ship: '',
//     shipUrl: '',
//     authCookie: '',
//     ...(firstShip ? firstShip : {})
//   };

//   storage.save({ key: 'store', data: newStore });

//   return newStore;
// }),
// removeAllShips: () => set(() => {
//   const newStore = { ships: [], ship: '', shipUrl: '', authCookie: '' };
//   storage.save({ key: 'store', data: newStore });

//   return newStore;
// }),
// setShip: (selectedShip: string) => set(({ ships }) => {
//   window.ship = deSig(selectedShip);
//   global.window.ship = deSig(selectedShip);
//   const newShip = ships.find(({ ship }) => ship === selectedShip);
//   const newStore: any = { ships, ship: '', shipUrl: '', authCookie: '', api: null };

//   if (newShip) {
//     const api = initializeApi(newShip.ship, newShip.shipUrl);
//     newStore.ship = newShip.ship;
//     newStore.shipUrl = newShip.shipUrl;
//     newStore.authCookie = newShip.authCookie || '';
//     newStore.api = api;
//   }

//   storage.save({ key: 'store', data: newStore });
//   return newStore;
// }),
// clearShip: () => set(() => ({ ship: '', shipUrl: '', authCookie: '' })),
// setWebViewRef: (webViewRef: React.RefObject<WebView>) => set({ webViewRef }),
// set
// }));
// }

const useStore = create((set, get) => generateStore(set, declare));

export default useStore;
