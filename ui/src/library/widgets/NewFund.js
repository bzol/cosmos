import useStore from '../../store';
import Row from "../components/Row";
import List from "../components/List";
import { poke, subscribe, unit, dedup } from "../../utils";
import React, { useState, useEffect, Component, useContext } from "react";

const FundDetails = (props) => {

	const state = useStore(state => state);
	const [newFund, setNewFund] = useState({
			from: '',
			name: "",
		  threshold: 0,
		tmpMember: { address: "", ship: '' },
			members: [],
	});
	const basicInfo = {
		title: "Basic Settings",
		columns: [],
		list: [
			[
				{ type: "text", content: "Founder Address" },
				{
					type: "input",
					placeholder: "e.g. 0x123",
					value: newFund.from,
					onChange: (value) => setNewFund({ ...newFund, from: value }),
				},
			],
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
				{ type: "text", content: "Threshold" },
				{
					type: "input",
					placeholder: "0",
					value: newFund.threshold,
					onChange: (value) => setNewFund({ ...newFund, threshold: value }),
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
				onClick={() => {state.multisig_pCreate({
					from: newFund.from,
					name: newFund.name,
					threshold: parseInt(newFund.threshold),
					members: newFund.members.map(m => m.address)
				})}}
			>
				Create
			</button>
		</div>
	);
};

export default FundDetails;
