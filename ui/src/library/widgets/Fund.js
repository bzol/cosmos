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
	const collective = state.collective_collectives.filter(
		(c) => c.name === fundName
	)[0];
	const [trackFund, setTrackFund] = useState(fundName);
	console.log(state.collective_collectives);
	const details = {
		title: "Basic Info",
		columns: [],
		list: [
			[
				{ type: "text", content: "Group" },
				{
					type: "text",
					content: "~" + collective?.creator?.ship + "/" + collective?.name,
				},
			],
			[
				{ type: "text", content: "Name" },
				{ type: "text", content: collective?.name },
			],
			[
				{ type: "text", content: "Fund ID" },
				{
					type: "text",
					content: collective?.fundName,
				},
			],
		],
	};
	const members = {
		title: "Members",
		columns: ["Ship", "Address", "Shares"],
		list: collective?.members?.map((member) => {
			const items = [
				{ type: "text", content: member?.ship },
				{ type: "text", content: member?.address },
				{ type: "text", content: member?.shares },
			];
			return items;
		}),
	};
	const assets = {
		title: "Assets",
		columns: ["Contract", "Metadata", "Amount", "Account"],
		list: collective?.assets?.map((asset) => {
			const items = [
				{ type: "text", content: asset?.contract },
				{ type: "text", content: asset?.metadata },
				{ type: "text", content: asset?.amount },
				{ type: "text", content: asset?.account },
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
	if (
		collective !== undefined &&
		props.widget?.coordinates?.w >= 400 &&
		props.widget?.coordinates?.h >= 400 
	)
		return (
			<div>
				<List data={details} />
				<List data={members} />
			</div>
		);
	else
		return <div> Double Click Me! </div>
	return (
		<div>
			{collective === undefined && (
				<div>
					{" "}
					Enter Fund Name and Save
					<input
						class="p-3 w-full border-stone-400"
						value={trackFund}
						placeholder={"Enter Fund Name and Save"}
						onChange={(e) => {
							setTrackFund(e.currentTarget.value);
							state.setWidgetAttribute(props.widget?.id, {
								fundName: e.currentTarget.value,
							});
						}}
					/>
					{/* <button */}
					{/* 	class="text-blue-400 hover:text-blue-600" */}
					{/* 	onClick={() => state.setWidgetAttribute(props.widget?.id, trackFund)} */}
					{/* > */}
					{/* 	Track */}
					{/* </button> */}
				</div>
			)}
			{/* <List data={assets} /> */}
			{/* <List data={actions} /> */}
		</div>
	);
};

export default Fund;
