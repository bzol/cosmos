const dimension = {
	id: "dimension-0.0.1",
	endpoints: [
		{
			name: "pSync",
			type: 'poke',
			app:  'dimension',
			mark: "dimension-action",
			action: "sync",
		},
		{
			name: "sDimensions",
			type: 'scry',
			app: 'dimension',
			path: "/dimensions",
		},
		{
			name: "sDesks",
			type: 'scry',
			app: 'dimension',
			path: "/desks",
		},
	],
};

export default dimension;
