import dashboard from './api/dashboard';
import hood from './api/hood';
import { bDashboard } from './bundles/dashboard';
import Create from './components/collective/Create';
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
		Create
	}
};

export default declare;
