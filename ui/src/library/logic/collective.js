import { poke, subscribe, unit, dedup } from "../../utils";
const _poke = poke("collective", "collective-action");

const collective = (set) => {
	return {
		// STATE
		// collective_collectives: [],
		collective_collectives: [
			// {
			// 	fundID: "0x123",
			// 	name: "testgroup",
			// 	creator: { address: "0x123", ship: "dinlug-pontun-pontus-fadpun" },
			// 	members: [
			// 		{
			// 			ship: "dinlug-pontun-pontus-fadpun",
			// 			address: "0x123456789",
			// 			shares: 100,
			// 		},
			// 		{
			// 			ship: "hapsyl-mosmed-pontus-fadpun",
			// 			address: "0x987654321",
			// 			shares: 200,
			// 		},
			// 	],
			// 	assets: [
			// 		{
			// 			account: "0x789",
			// 			contract: "0x123",
			// 			metadata: "0x456",
			// 			amount: 13,
			// 		},
			// 	],
			// 	// open, sealed, liquidated
			// 	// status: "open",
			// 	actions: [],
			// },
		],
		// POKES
		collective_pCreate: (json) => _poke({ create: json}),
		// collective_pFund: (json) => _poke({ fund: json }),
		// SUBSCRIPTIONS
		collective_sClient: (handler) => {
			subscribe("collective", "/client", (client) => {
				console.log(client);
				set((state) => ({
					collective_collectives: client,
				}));
			});
		},
	};
};

export default collective;
