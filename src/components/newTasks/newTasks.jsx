import st from "./newTasks.module.css";
import { Task } from "../task/task";
import { ClearBtn } from "../clearBtn/clearBtn";
import { TaskInput } from "../taskInput/taskInput";
import TasksStore from "../../store/taskStorage";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

export const NewTasks = observer(() => {
	const [isListEmpty, setIsListEmpty] = useState(true);

	const checkEmpty = () => {
		if (TasksStore.tasksToDo.length) setIsListEmpty(false);
		else setIsListEmpty(true);
	};
	console.log("Квант: ", TasksStore.quantum);

	useEffect(() => {
		checkEmpty();
	}, [TasksStore.tasksToDo.length]);
	return (
		<div className={st.newTasks}>
			<TaskInput />
			<div className={isListEmpty ? st.empty_list : st.list}>
				{isListEmpty ? (
					<>
						<p className={st.empty_txt}>The new tasks </p>
						<p className={st.empty_txt}>will be located here</p>
					</>
				) : (
					TasksStore.tasksToDo?.map((task, id) => (
						<Task name={task.name} timeToDo={task.time} key={id} />
					))
				)}
			</div>
			{/* Передаём так, чтобы не терять контекст вызова метода */}
			<ClearBtn clearTaskList={() => TasksStore.clearTaskToDoList()} />
		</div>
	);
});
