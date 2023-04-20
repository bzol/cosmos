// import from interfaces then combine them together into bundles here
// bundle.js  
//

export const bDashboard = ({dashboard}) => {
	return {pSync: dashboard.pSync, sDashboards: dashboard.sDashboards};
}
