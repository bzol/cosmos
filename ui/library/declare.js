import dashboard from './api/dashboard';
import hood from './api/hood';
import { bDashboard } from './bundles/dashboard';
import Create from './components/collective/Create';
import SpellBook from './components/SpellBook';
const declare = {
	urbit: {
		ship: "nec",
		url: "localhost:8080",
		code: "ropnys-batwyd-nossyt-mapwet",
	},
	api: {
		dashboard,
		hood
	},
	bundles: {
		bDashboard
	},
	components: {
		Create,
		SpellBook
	}
};

export default declare;
