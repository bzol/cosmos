import useStore from '../../store';
import Row from "../components/Row";
import List from "../components/List";
import { poke, subscribe, unit, dedup } from "../../utils";
import React, { useState, useEffect, Component, useContext } from "react";

const FundDetails = (props) => {

	// window.urbit.poke({
	// 	app: "collective",
	// 	mark: "collective-action",
	// 	json: {name: 'fund1' , wallet:'0x7a9a.97e0.ca10.8e1e.273f.0000.8dca.2b04.fc15.9f70', ship: '~zod', members: [{address: '0xe359.fe9d.4b15.de9d.ce22.6517.6ddd.30c7.4b96.c01e', ship: '~dev'}]}
	// });

	const state = useStore(state => state);
	const [newFund, setNewFund] = useState({
			name: "",
			wallet: '0x123',
			ship: '',
			tmpMember: { ship: "", address: "" },
			members: [],
	});
	const basicInfo = {
		title: "Basic Settings",
		columns: [],
		list: [
			[
				{ type: "text", content: "Fund Name" },
				{
					type: "input",
					placeholder: "e.g. My Super Fund",
					value: newFund.name,
					onChange: (value) => setNewFund({ ...newFund, name: value }),
				},
			],
			[
				{ type: "text", content: "Founder Address" },
				{
					type: "input",
					placeholder: "e.g. 0x123",
					value: newFund.wallet,
					onChange: (value) => setNewFund({ ...newFund, wallet: value }),
				},
			],
		],
	};
	const memberInput = {
		title: "",
		columns: [],
		list: [
			[
				{
					type: "input",
					value: newFund.tmpMember.address,
					placeholder: "address (e.g. 0x1234...)",
					onChange: (value) =>
						setNewFund({
							...newFund,
							tmpMember: { ...newFund.tmpMember, address: value },
						}),
				},
				{
					type: "input",
					value: newFund.tmpMember.ship,
					placeholder: "ship (e.g. ~sampel-palnet)",
					onChange: (value) =>
						setNewFund({
							...newFund,
							tmpMember: { ...newFund.tmpMember, ship: value },
						}),
				},
				{
					type: "button",
					onClick: (args) => {
						setNewFund({
							...args[0],
							members: args[0].members.concat(args[1]),
						});
					},
					onClickArg: [
						newFund,
						{
							ship: newFund.tmpMember.ship,
							address: newFund.tmpMember.address,
						},
					],
					content: "Add Member",
				},
			],
		],
	};
	const members = {
		title: "New Members",
		columns: ["Address", "Ship", "Actions"],
		list: newFund.members.map((member) => {
			const items = [
				{ type: "text", content: member.address },
				{ type: "text", content: member.ship },
				{
					type: "button",
					onClick: (args) =>
						setNewFund({
							...args[0],
							members: args[0].members.filter(
								(m) =>
									!(m.ship === args[1].ship && m.address === args[1].address)
							),
						}),
					onClickArg: [newFund, member],
					content: "Remove Member",
				},
			];
			return items;
		}),
	};
	return (
		<div>
			<List data={basicInfo} />
			<List data={members} />
			<List data={memberInput} />
			<button
				// class="text-blue-400 hover:text-blue-600 float-right m-9"
				onClick={() => {state.collective_pCreate({
					name: newFund.name,
					wallet: newFund.wallet,
					ship: '~' + window.urbit.ship,
					members: newFund.members
				})}}
			>
				Create
			</button>
		</div>
	);
};

export default FundDetails;
