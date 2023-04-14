import UrbitHttpApi from "@urbit/http-api";
import { create } from "zustand";
import { Platform } from 'react-native';
import { configureApi } from '@uqbar/react-native-api/configureApi'
import WebUrbit from '@urbit/http-api';
import Urbit from '@uqbar/react-native-api';

const keyboardOffset = Platform.OS === 'ios' ? 46 : 82
const isIos = Platform.OS === 'ios'
const isAndroid = Platform.OS === 'android'
const isWeb = Platform.OS === 'web'
const keyboardAvoidBehavior = isIos ? 'padding' : undefined

// window.api = null;
// UrbitHttpApi.authenticate({
// 	ship: declare.urbit.ship,
// 	url: declare.urbit.url,
// 	code: declare.urbit.code,
// 	verbose: true,
// })
// 	.then((api) => {
// 		window.api = api;
// 		console.log(window.api);
// 		window.api
// 			.scry({
// 				app: "wallet",
// 				path: "/accounts",
// 			})
// 			.then((res) => {
// 				console.log(res);
// 			});
// 	})
// 	.catch(() => {
// 		window.api = null;
// 	});

const initializeApi = (ship, shipUrl) => {
  if (isWeb) {
    const api = new WebUrbit('', '', 'pongo')
    api.ship = window.ship
    return api
  }
  
  return configureApi(ship, shipUrl)
}

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
	let ret = {};
	for (const key in iface) {
		let obj = {};
		if ("app" in iface[key]) {
			obj["p_" + ifaceKey + "_" + key] = (json) =>
				poke(
					iface[key].app,
					iface[key].mark,
					json,
					() => {},
					() => {}
				);
			// obj["py_" + ifaceKey + "_" + key] = true;
		}
		if ("path" in iface[key]) {
			obj["s_" + ifaceKey + "_" + key] = null;
		}
		ret = { ...ret, ...obj };
		// 		console.log(ps.app);
		// if('path' in ps)
	}
	return ret;
};

// export default function (declare) {
// 	// window.urbit.onOpen = () => this.setState({ conn: "ok" });
// 	// window.urbit.onRetry = () => this.setState({ conn: "try" });
// 	// window.urbit.onError = () => this.setState({ conn: "err" });

// 	const store = (set) => {
// 		let ret = { mode: "view" };
// 		for (const key in declare.agents) {
// 			ret = { ...ret, ...transformInterface(key, declare.agents[key]) };
// 		}
// 		console.log(ret);
// 		return ret;
// 	};

// 	// const scryres = window.urbit.scry({app: 'azimuth'})
// 	return store;
// }

export default function (declare) {
	return 
	create<Store>((set, get) => ({
  loading: true,
  needLogin: true,
  ship: '',
  shipUrl: '',
  authCookie: '',
  ships: [],
  api: null,
  webViewRef: null,
  setNeedLogin: (needLogin: boolean) => set(() => ({ needLogin })),
  loadStore: (store: any) => set(() => {
    window.ship = deSig(store.ship);
    global.window.ship = deSig(store.ship);

    const api = initializeApi(store.ship, store.shipUrl);
    global.api = api as any
    window.api = api as any

    return { ...store, api };
  }),
  setShipUrl: (shipUrl: string) => set({ shipUrl }),
  setLoading: (loading: boolean) => set({ loading }),
  addShip: (shipConnection: ShipConnection) => set((store) => {
    const { ship } = shipConnection;
    const api = initializeApi(shipConnection.ship, shipConnection.shipUrl);
    const newStore: any = getNewStore(store, shipConnection.ship, { ...shipConnection, ship: `~${deSig(ship)}` }, api as any);
    
    storage.save({ key: 'store', data: newStore });
    return newStore;
  }),
  removeShip: (oldShip: string) => set(({ ships }: any) => {
    const newShips = ships.filter(({ ship }: any) => ship !== oldShip)
    const firstShip = newShips[0];
    
    const newStore = {
      ships: newShips,
      ship: '',
      shipUrl: '',
      authCookie: '',
      ...(firstShip ? firstShip : {})
    };

    storage.save({ key: 'store', data: newStore });

    return newStore;
  }),
  removeAllShips: () => set(() => {
    const newStore = { ships: [], ship: '', shipUrl: '', authCookie: '' };
    storage.save({ key: 'store', data: newStore });

    return newStore;
  }),
  setShip: (selectedShip: string) => set(({ ships }) => {
    window.ship = deSig(selectedShip);
    global.window.ship = deSig(selectedShip);
    const newShip = ships.find(({ ship }) => ship === selectedShip);
    const newStore: any = { ships, ship: '', shipUrl: '', authCookie: '', api: null };

    if (newShip) {
      const api = initializeApi(newShip.ship, newShip.shipUrl);
      newStore.ship = newShip.ship;
      newStore.shipUrl = newShip.shipUrl;
      newStore.authCookie = newShip.authCookie || '';
      newStore.api = api;
    }

    storage.save({ key: 'store', data: newStore });
    return newStore;
  }),
  clearShip: () => set(() => ({ ship: '', shipUrl: '', authCookie: '' })),
  setWebViewRef: (webViewRef: React.RefObject<WebView>) => set({ webViewRef }),
  set
}));
}
