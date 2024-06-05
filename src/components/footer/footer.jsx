import st from "./footer.module.css";

export const Footer = () => {
	return (
		<div className={st.footer}>
			<p className={st.txt}>
				Task: Development of the OS dispatcher emulator. Multilevel feedback queue
				scheduling
			</p>
			<p className={st.txt}>Students: Fedchenko Artem, Azarov Ivan</p>
			<p className={st.txt}>Group: PM-25</p>
		</div>
	);
};
