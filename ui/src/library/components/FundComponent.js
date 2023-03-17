import List from "../components/List";
import React, { useState } from "react";
import useStore from "../../store";
const FundComponent = (props) => {
	const state = useStore((state) => state);
	const multisig = state.multisig_multisigs.filter(
		(c) => c.id === props.fundID
	)[0];
	const [trackFund, setTrackFund] = useState(props.fundID);
	console.log(multisig);
	console.log(props);
	const details = {
		title: "Basic Info",
		columns: [],
		list: [
			[
				{ type: "text", content: "Name" },
				{ type: "text", content: multisig?.name },
			],
			[
				{ type: "text", content: "Threshold" },
				{ type: "text", content: multisig?.threshold },
			],
		],
	};
	const members = {
		title: "Members",
		columns: ["Address"],
		list: multisig?.members?.map((member) => {
			const items = [
				{ type: "text", content: member},
			];
			return items;
		}),
	};
	const assets = {
		title: "Assets",
		columns: ["Address", "Amount"],
		list: multisig?.assets?.map((asset) => {
			const items = [
				{ type: "text", content: asset?.account },
				{ type: "text", content: asset?.amount },
			];
			return items;
		}),
	};
	// send: proposer, to address, account address, amount
	// custom proposal:
	const newProposals = {
		title: "New Proposals",
		columns: [],
		list: [
			[
				{ type: "text", content: 'Send' },
				{
					type: "input",
					value: state.newAsset?.myWallet,
					placeholder: "Proposer Address",
					onChange: (value) =>
						state.setNewAsset({ ...state.newAsset, myWallet: value }),
				},
				{
					type: "input",
					value: state.newAsset?.assetAccount,
					placeholder: "Asset Address",
					onChange: (value) =>
						state.setNewAsset({ ...state.newAsset, assetAccount: value }),
				},
				{
					type: "input",
					value: state.newAsset?.amount,
					placeholder: "Asset Amount",
					onChange: (value) =>
						state.setNewAsset({ ...state.newAsset, amount: value }),
				},
				{
					type: "button",
					onClick: (args) => {
						state.hackathon_pFund(args[0]);
					},
					onClickArg: [state.newAsset],
					content: "Send Funds",
				},
			],
		],
	};
	//  raw calldata, who voted, ayes, nays, button to vote
	//  create popup window for this
	const pendingProposals = {
		title: "Pending Proposals",
		columns: ["Hash", "Ayes", "Nays", "Details"],
		list: [],
		// list: multisig?.proposals?.map((proposal) => {
		// 	const items = [
		// 		{ type: "text", content: proposal?.hash },
		// 		{ type: "text", content: proposal?.ayes },
		// 		{ type: "text", content: proposal?.nays },
		// 	];
		// 	return items;
		// })
	};
	// if (
	// 	multisig !== undefined &&
	// 	(state.maximized === props.widget.id ||
	// 		(props.widget?.coordinates?.w >= 400 &&
	// 			props.widget?.coordinates?.h >= 400))
	// )
	return (
			<div>
				<List data={details} />
				<List data={members} />
				<List data={assets} />
				<List data={newProposals} />
				<List data={pendingProposals} />
			</div>
		);
};

export default FundComponent;
