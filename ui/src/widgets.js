import NewFund from './library/widgets/NewFund';

export const widgets = [
	{ type: 'fund', component: NewFund },
	{ type: 'fundlist', component: NewFund },
	{ type: 'newfund', component: NewFund },
];

const selectWidget = (widget) => {
	// console.log(widget);
	switch(widget.type) {
		case 'fund':
			return NewFund(widget);
		case 'fundlist':
			return NewFund(widget);
		case 'newfund':
			return NewFund(widget);
	}
	// return widgets.filter( w => w.type === widget.type )[0].component(widget);
}

export default selectWidget;
