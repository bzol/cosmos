const dimension = {
	id: "dimension-0.0.1",
	endpoints: [
		{
			name: "pSync",
			type: 'poke',
			app:  'dimension',
			mark: "dimension-action",
		},
		{
			name: "sDimensions",
			type: 'scry',
			app: 'dimension',
			path: "/dimensions",
		},
	],
};

export default dimension;
