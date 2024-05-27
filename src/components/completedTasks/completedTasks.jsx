import st from "./completedTasks.module.css";
import { ClearBtn } from "../clearBtn/clearBtn";
import { Task } from "../task/task";

let tasks = [
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
];

export const CompletedTasks = () => {
	return (
		<div className={st.completed}>
			<p className={st.txt}>Completed Tasks</p>
			<div className={st.list}>
				{tasks.map((task, id) => (
					<Task name={task.name} timeToDo={task.time} key={id} />
				))}
			</div>
			<ClearBtn />
		</div>
	);
};
