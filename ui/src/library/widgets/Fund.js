import List from "../components/List";
import React, { useState } from "react";
import useStore from "../../store";
const Fund = (props) => {
	const state = useStore((state) => state);
	const fundName =
		props.fundList !== undefined
			? props.fundList
			: props.widget?.attributes?.fundName !== undefined
			? props.widget?.attributes?.fundName
			: "";
	const multisig = state.multisig_multisigs.filter(
		(c) => c.name === fundName
	)[0];
	const [trackFund, setTrackFund] = useState(fundName);
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
				{ type: "text", content: multisig?.name },
			],
		],
	};
	const members = {
		title: "Members",
		columns: ["Address"],
		list: multisig?.members?.map((member) => {
			const items = [
				{ type: "text", content: member?.address },
			];
			return items;
		}),
	};
	const actions = {
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
	// if (
	// 	multisig !== undefined &&
	// 	(state.maximized === props.widget.id ||
	// 		(props.widget?.coordinates?.w >= 400 &&
	// 			props.widget?.coordinates?.h >= 400))
	// )
	return (
			<div>
				<List data={details} />
				{/* <List data={members} /> */}
			</div>
		);
	// else if (multisig === undefined)
	// 	return (
	// 		<div>
	// 					<button
	// 						class="text-blue-400 hover:text-blue-600"
	// 						onClick={() => state.setWidgetAttribute(props.widget?.id, trackFund)}
	// 					>
	// 						Track
	// 					</button>
	// 			{/* <List data={actions} /> */}
	// 		</div>
	// 	);
	// // else return <div> Double Click Me! </div>;
};

export default Fund;
