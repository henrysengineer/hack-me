import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Employees from "../business/employees";
import Desks from "../business/desks";
import NavBar from "../ui/nav";

import styles from "./index.module.scss";

enum ROUTE_LABELS {
	ROOT = "Root",
	EMPLOYEES = "Employees",
	DESKS = "Desks",
	BOOKINGS = "Bookings",
}

enum ROUTE_NAMES {
	ROOT = "/",
	EMPLOYEES = "/employees",
	DESKS = "/desks",
	BOOKINGS = "/bookings",
}

export default function AppRouter() {
	return (
		<Router>
			<div>
				<NavBar
					title="Desk booking app"
					routeComponents={[
						<Link className={styles["nav-link"]} to={ROUTE_NAMES.EMPLOYEES}>
							{ROUTE_LABELS.EMPLOYEES}
						</Link>,
						<Link className={styles["nav-link"]} to={ROUTE_NAMES.DESKS}>
							{ROUTE_LABELS.DESKS}
						</Link>,
					]}
				/>

				<Switch>
					<Route path={ROUTE_NAMES.EMPLOYEES}>
						<Employees />
					</Route>
					<Route path={ROUTE_NAMES.DESKS}>
						<Desks />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
