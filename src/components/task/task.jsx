import st from "./task.module.css";

export const Task = ({ name, timeToDo }) => {
	return (
		<li className={st.main}>
			<p className={st.txt}>{name}</p>
			<p className={st.txt}>Execution time: {timeToDo}</p>
		</li>
	);
};
