import Row from "../components/Row";
import List from "../components/List";
import Fund from "./Fund";
import useStore from '../../store';
import React, { useState } from "react";

const FundList = (props) => {
	const state = useStore(state => state);
	const [fund, setFund] = useState(null);
	const fundList = {
		title: 'List of Funds',
		columns: ['Fund Name', 'Member Count', 'My Shares', 'Actions'],
		list: 
		state.collective_collectives.map((collective) => {
			const items = [
				{ type: "text", content: collective.name },
				{ type: "text", content: collective.members.length },
				{
					type: "text",
					content: collective.members.filter(
						(c) => c.ship === ('~' + window.urbit.ship)
					)[0]?.shares,
				},
				{
					type: "button",
					onClick: setFund,
					onClickArg: collective.fundID,
					content: "Details",
				},
			];
			return items;
		})
	}
	if( props.widget.coordinates.w >= 800 && props.widget.coordinates.h >= 400 || state.maximized === props.widget.id)
	return (
		<div>
		{fund === null && <List data={fundList}/>
			}
			{fund !== null && <div><Fund fundList={fund}/></div>}
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
