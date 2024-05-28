import st from "./completedTasks.module.css";
import { ClearBtn } from "../clearBtn/clearBtn";
import { Task } from "../task/task";
import TasksStore from "../../store/toDo";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

export const CompletedTasks = observer(() => {
	const [isListEmpty, setIsListEmpty] = useState(true);

	const checkEmpty = () => {
		if (TasksStore.completedTasks.length) setIsListEmpty(false);
		else setIsListEmpty(true);
	};
	console.log(isListEmpty);
	useEffect(() => {
		checkEmpty();
	}, [TasksStore.completedTasks.length]);

	return (
		<div className={st.completed}>
			<p className={st.txt}>Completed Tasks</p>
			<div className={isListEmpty ? st.empty_list : st.list}>
				{isListEmpty ? (
					<>
						<p className={st.empty_txt}>The completed tasks </p>
						<p className={st.empty_txt}>will be located here</p>
					</>
				) : (
					TasksStore.completedTasks.map((task, id) => (
						<Task name={task.name} timeToDo={task.time} key={id} />
					))
				)}
			</div>
			<ClearBtn clearTaskList={() => TasksStore.clearCompletedTaskList()} />
		</div>
	);
});
