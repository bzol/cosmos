import useStore from '../../store';

const NewFund = (props) => {
	const state = useStore(state => state);
	return <div 
		draggable="false"
	class='relative h-full hover:overflow-visible overflow-hidden p-2' style={{draggable: "false" }}>hello</div>
}

export default NewFund;
