import ApiConnector from "../../../technical/apiConnector/index.abstract";

export default class EmployeesApiConnector extends ApiConnector {
	constructor() {
		super("http://localhost:3000/api/employees");
	}
}
