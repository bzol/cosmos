import { poke, subscribe, unit, dedup } from "../../utils";
const _poke = poke("multisig", "multisig-action");

const collective = (set) => {
	return {
		// STATE
		// collective_collectives: [],
		collective_collectives: [
			// {
			// 	id: "0x123",
			// 	init: false,
			// 	name: "testgroup",
			// 	members: [
			// 	0x123,
			// 	0x456
			// 	],
			// 	threshold: 0,
			//  executed: [
			//  	0x123,
			//  	0x456
			//  ]
			//  pending: [
			//  	{
			//  		calls: [{'%noun': '[0 1 2 3]'}],
			//  		votes: ['0x123': true],
			//  		ayes: 1,
			//  		nays: 0,
			//  	}
			//  ]
			// 	actions: [],
			// },
		],
		// POKES
		collective_pCreate: (json) => _poke({ create: json}),
		collective_pVote: (json) => _poke({ vote: json}),
		collective_pPropose: (json) => _poke({ propose: json}),
		collective_pAddMember: (json) => _poke({ 'add-member': json}),
		collective_pRemoveMember: (json) => _poke({ 'remove-member': json}),
		// collective_pFund: (json) => _poke({ fund: json }),
		// SUBSCRIPTIONS
		collective_sClient: (handler) => {
				console.log('helloka');
			subscribe("multisig", "/client", (client) => {
				console.log('helloka2');
				set((state) => ({
					collective_collectives: client,
				}));
			});
		},
	};
};

export default collective;
