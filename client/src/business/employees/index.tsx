import { useEffect, useState } from "react";

import List from "../../ui/list";

import styles from "./index.module.scss";
import EmployeesApiConnector from "./apiConnector";
import { Employee } from "./interface";

const apiConnector = new EmployeesApiConnector();

export default function Employees() {
	let [employees, setEmployees] = useState<Employee[]>([]);

	useEffect(() => {
		const populateState = async () => {
			const allEmployees = await apiConnector.getAll<Employee>();
			setEmployees(allEmployees);
		};

		populateState();
	}, []);

	return (
		<div className={styles["employees-container"]}>
			{/*	Refactor into table of components */}
			<List
				items={employees.map((employee) =>
					[
						employee.employeeId,
						employee.fullName,
						employee.age,
						employee.job,
					].join(" ")
				)}
			/>
		</div>
	);
}
