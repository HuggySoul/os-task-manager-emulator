import st from "./processList.module.css";
import { ProgressBar } from "../progressBar/progressBar";
import TasksStore from "../../store/toDo";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

let Tasks = [
	// { name: "Task1", time: 10 },
	// { name: "Task2", time: 20 },
	// { name: "Task3", time: 30 },
	// { name: "Task4", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 100 },
];

export const ProcessList = () => {
	const [isListEmpty, setIsListEmpty] = useState(true);

	const checkEmpty = () => {
		if (TasksStore.tasksInProcess.length) setIsListEmpty(false);
		else setIsListEmpty(true);
	};

	useEffect(() => {
		checkEmpty();
	}, [TasksStore.tasksInProcess.length]);

	return (
		<div className={st.processor}>
			<p className={st.txt}>Processor</p>
			<div className={isListEmpty ? st.empty_List : st.list}>
				{isListEmpty ? (
					<>
						<p className={st.empty_txt}>The processes that are running</p>
						<p className={st.empty_txt}>will be located here</p>
					</>
				) : (
					Tasks.map((task, id) => (
						<ProgressBar percentage={task.time} taskName={task.name} key={id} />
					))
				)}
			</div>
		</div>
	);
};
