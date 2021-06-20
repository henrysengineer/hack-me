import styles from "./index.module.scss";

export default function List({
	items,
}: {
	items: string[];
	onClick?: () => void;
}) {
	return (
		<div className={styles["list-container"]}>
			{items.map((item, key) => (
				<div key={key} className={styles["list-element"]}>
					{item}
				</div>
			))}
		</div>
	);
}
