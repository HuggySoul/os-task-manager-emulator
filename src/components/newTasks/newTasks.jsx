import st from "./newTasks.module.css";
import { TaskInput } from "../taskInput/taskInput";
import { Task } from "../task/task";
import { ClearBtn } from "../clearBtn/clearBtn";

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

export const NewTasks = () => {
	return (
		<div className={st.newTasks}>
			<TaskInput />
			<div className={st.list}>
				{Tasks.map((task, id) => (
					<Task name={task.name} timeToDo={task.time} key={id} />
				))}
			</div>
			<ClearBtn />
		</div>
	);
};
