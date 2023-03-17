import Row from "../components/Row";
import List from "../components/List";
import FundComponent from "../components/FundComponent";
import useStore from '../../store';
import React, { useState } from "react";

const FundList = (props) => {
	const state = useStore(state => state);
	const [fundID, setFundID] = useState(null);
	const fundList = {
		title: 'List of Funds',
		columns: ['Fund Name', 'Member Count', 'Actions'],
		list: 
		state.multisig_multisigs.map((multisig) => {
			const items = [
				{ type: "text", content: multisig.name },
				{ type: "text", content: multisig.members.length },
				{
					type: "button",
					onClick: setFundID,
					onClickArg: multisig.id,
					content: "Details",
				},
			];
			return items;
		})
	}
	if( props.widget.coordinates.w >= 800 && props.widget.coordinates.h >= 400 || state.maximized === props.widget.id)
	return (
		<div>
		{fundID === null && <List data={fundList}/>
			}
			{fundID !== null && <div><FundComponent fundID={fundID}/></div>}
		</div>
	);
	else
		return (
			<span class='break-words text-ellipsis overflow-hidden'>
				Double Click On Me!!!!!!
			</span>
		)
};

export default FundList;
