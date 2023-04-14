import NewFund from './library/widgets/NewFund';
import Fund from './library/widgets/Fund';
import FundList from './library/widgets/FundList';

export const widgetLibrary = [
	{ type: 'fund', component: Fund },
	{ type: 'fundlist', component: FundList },
	{ type: 'newfund', component: NewFund },
];

export default widgetLibrary;
