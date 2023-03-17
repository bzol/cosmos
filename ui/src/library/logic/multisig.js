import { poke, subscribe, unit, dedup } from "../../utils";
const _poke = poke("multisig", "multisig-action");

const collective = (set) => {
	return {
		// STATE
		// collective_collectives: [],
		multisig_multisigs: [
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
			//  		hash: '0x123',
			//  		calls: [
			//  		{}
			//  		]
			//  		votes: ['0x123': true],
			//  		ayes: 1,
			//  		nays: 0,
			//  	}
			//  ]
			//  assets: [
			//  { address: '0x123', amount: 123 },
			//  { address: '0x456', amount: 456 },
			//  ]
			// },
		],
		// POKES
		multisig_pCreate: (json) => _poke({ create: json}),
		collective_pVote: (json) => _poke({ vote: json}),
		// collective_pPropose: (json) => _poke({ propose: json}),
		// collective_pAddMember: (json) => _poke({ 'add-member': json}),
		// collective_pRemoveMember: (json) => _poke({ 'remove-member': json}),
		// collective_pFund: (json) => _poke({ fund: json }),
		// SUBSCRIPTIONS
		multisig_sClient: (handler) => {
			subscribe("multisig", "/client", (client) => {
				set((state) => ({
					multisig_multisigs: client,
				}));
			});
		},
	};
};

export default collective;
