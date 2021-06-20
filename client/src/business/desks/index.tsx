import { useEffect, useState } from "react";

import List from "../../ui/list";

import styles from "./index.module.scss";
import DesksApiConnector from "./apiConnector";
import { Desk } from "./interface";

const apiConnector = new DesksApiConnector();

export default function Desks() {
	let [desks, setDesks] = useState<Desk[]>();

	useEffect(() => {
		const populateState = async () => {
			const allDesks = await apiConnector.getAll<Desk>();
			setDesks(allDesks);
		};

		populateState();
	}, []);

	return (
		<div className={styles["desks-container"]}>
			{/*	Refactor into table of components */}
			<List
				items={
					desks?.map((desk) =>
						[desk.deskId, desk.occupancy, desk.type].join(" ")
					) ?? []
				}
			/>
		</div>
	);
}
