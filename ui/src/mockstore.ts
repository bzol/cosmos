export const isMocking = false;

export const mockStore = {
	_loading: true,
	_needLogin: true,
	_ship: "",
	_shipUrl: "",
	_authCookie: "",
	_urbit: null,
	_screen: {
		type: "dashboard",
		id: "hood",
	},
	_camera: {},
	dashboard: {
		pSync: {
			mark: "dashboard-action",
		},
		sDashboards: {
			path: "/dashboards",
			data: [
				{
					portals: [
						{
							coordinates: {
								x: 400,
								w: 200,
								h: 200,
								y: 950,
							},
							component: "create",
							id: "helm",
							bundle: "dashboard",
							attributes: {},
						},
						{
							coordinates: {
								x: 100,
								w: 200,
								h: 200,
								y: 100,
							},
							component: "create",
							id: "portal2",
							bundle: "dashboard",
							attributes: {},
						},
					],
					id: "hood",
				},
			],
		},
	},
	hood: {
		pHi: {
			mark: "helm-hi",
		},
	},
};
