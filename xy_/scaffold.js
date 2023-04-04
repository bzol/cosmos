// const fs = require("fs");
const template = require("@babel/template");

const createUrbit = (declare) =>
	// const json = JSON.parse(_interface);
	{
		return (`
		window.urbit = new Urbit(
			"${declare.urbit.address}",
			"",
			"${declare.urbit.code}",
		);
		window.urbit.ship = "${declare.urbit.ship}";
	
		window.urbit.onOpen = () => this.setState({ conn: "ok" });
		window.urbit.onRetry = () => this.setState({ conn: "try" });
		window.urbit.onError = () => this.setState({ conn: "err" });
		`)
	}

const createStore = (_interface) =>
{
	return (
	)
}

module.exports = {createUrbit};

// const interface = json.load("./interface.json");
// const _interface = fs.readFileSync('./interface.json', "utf8");
// console.log(JSON.parse(_interface));

// console.log(store);

// import create from "zustand";
// const main = (set) => {
// 	return {
// 	}
// };
// const useStore = create(main);
// console.log(useStore);
// console.log('store.js');
// console.log('store.js');


