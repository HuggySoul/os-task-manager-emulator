import st from "./app.module.css";
import { Task } from "./components/task/task";
import { TaskList } from "./components/taskList/taskList";

let Tasks = [
	{ name: "Task1", time: 10 },
	{ name: "Task2", time: 20 },
	{ name: "Task3", time: 30 },
	{ name: "Task4", time: 40 },
	{ name: "Task5", time: 40 },
];
function App() {
	return (
		<div className={st.main}>
			<TaskList>
				{Tasks.map((task, id) => (
					<Task name={task.name} timeToDo={task.time} key={id} />
				))}
			</TaskList>
		</div>
	);
}

export default App;
