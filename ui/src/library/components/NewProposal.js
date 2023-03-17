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
	const proposal = {
		title: "Actions",
		columns: [],
		list: [
			[
				{
					type: "input",
					value: state.newAsset?.myWallet,
					placeholder: "My Account",
					onChange: (value) =>
						state.setNewAsset({ ...state.newAsset, myWallet: value }),
				},
				{
					type: "input",
					value: state.newAsset?.assetAccount,
					placeholder: "Asset Account",
					onChange: (value) =>
						state.setNewAsset({ ...state.newAsset, assetAccount: value }),
				},
				{
					type: "input",
					value: state.newAsset?.assetMetadata,
					placeholder: "Asset Metadata",
					onChange: (value) =>
						state.setNewAsset({ ...state.newAsset, assetMetadata: value }),
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
		title: "Actions",
		columns: [],
		list: multisig?.assets?.map((asset) => {
			const items = [
				{ type: "text", content: asset?.account },
				{ type: "text", content: asset?.amount },
			];
			return items;
		})
	};
	// back button
	return (
			<div>
				<List data={details} />
				<List data={members} />
				<List data={assets} />
			</div>
		);
};

export default FundComponent;
