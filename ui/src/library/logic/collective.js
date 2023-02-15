import { poke, subscribe, unit, dedup } from "../../utils";
const _poke = poke("multisig", "multisig-action");

const collective = (set) => {
	return {
		// STATE
		// POKES
		collective_pSendFungible: (json) => _poke({ create: json}),
		// collective_pAddMember: (json) => _poke({ 'add-member': json}),
		// collective_pRemoveMember: (json) => _poke({ 'remove-member': json}),
		// collective_pFund: (json) => _poke({ fund: json }),
		// SUBSCRIPTIONS
		collective_sClient: (handler) => {
			subscribe("collective", "/client", (client) => {
				set((state) => ({
					collective_collectives: client,
				}));
			});
		},
	};
};

export default collective;
