import dimension from './apis/dimension';
import Create from './components/Create';
import SpellBook from './components/SpellBook';

const declare = {
	id: 'dimension',
	apis: [
		dimension,
	],
	components: [
		Create,
		SpellBook
	]
};

export default declare;
