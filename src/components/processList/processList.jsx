import st from "./processList.module.css";
import { ProgressBar } from "../progressBar/progressBar";

let Tasks = [
	{ name: "Task1", time: 10 },
	{ name: "Task2", time: 20 },
	{ name: "Task3", time: 30 },
	{ name: "Task4", time: 40 },
	{ name: "Task5", time: 40 },
	{ name: "Task5", time: 40 },
	{ name: "Task5", time: 40 },
	{ name: "Task5", time: 40 },
	{ name: "Task5", time: 40 },
	{ name: "Task5", time: 40 },
	{ name: "Task5", time: 40 },
	{ name: "Task5", time: 100 },
];

export const ProcessList = () => {
	return (
		<div className={st.processor}>
			<p className={st.txt}>Processor</p>
			<div className={st.list}>
				{Tasks.map((task, id) => (
					<ProgressBar percentage={task.time} taskName={task.name} key={id} />
				))}
			</div>
		</div>
	);
};
