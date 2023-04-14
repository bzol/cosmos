import Urbit from "@urbit/http-api";
import { create } from "zustand";

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

export default function (declare) {
	window.urbit = new Urbit(declare.urbit.address, "", declare.urbit.code);
	window.urbit.ship = declare.urbit.ship;

	window.urbit.onOpen = () => this.setState({ conn: "ok" });
	window.urbit.onRetry = () => this.setState({ conn: "try" });
	window.urbit.onError = () => this.setState({ conn: "err" });

	const store = (set) => {
		let ret = {mode: 'view'};
		for (const key in declare.agents) {
			ret = { ...ret, ...transformInterface(key, declare.agents[key]) };
		}
		console.log(ret);
		return ret;
	};

	return store;
}
