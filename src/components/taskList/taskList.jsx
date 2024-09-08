import st from "./taskList.module.css";
import { Task } from "../task/task";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TaskInput } from "../taskInput/taskInput";
import clearQueueIcon from "./assets/clearQueueIcon.svg";

export const TaskList = observer(({ tasks, tasksType, clearList }) => {
	const [isListEmpty, setIsListEmpty] = useState(true);
	const [isAddingTask, setIsAddingTask] = useState(false);

	const checkEmpty = () => {
		if (tasks.length) setIsListEmpty(false);
		else setIsListEmpty(true);
	};

	useEffect(() => {
		checkEmpty();
	}, [tasks.length]);

	const isNewTaskList = () => {
		return tasksType.toLowerCase() === "new";
	};

	return (
		<div className={st.taskList}>
			{(!isAddingTask || !isNewTaskList()) && (
				<button onClick={clearList} title="Delete all tasks" className={st.clearQueueBtn}>
					<img className={st.clearQueueIcon} src={clearQueueIcon} alt="Clear queue" />
				</button>
			)}
			<div
				style={{ marginTop: "44px" }}
				className={isListEmpty ? st.empty_list : st.list}
			>
				{isNewTaskList() ? (
					<TaskInput isAddingTask={isAddingTask} setIsAddingTask={setIsAddingTask} />
				) : (
					<></>
				)}
				{isListEmpty ? (
					<div className={st.txt}>
						<p className={st.empty_txt}>The {tasksType} tasks </p>
						<p className={st.empty_txt}>will be located here</p>
					</div>
				) : (
					<div style={isNewTaskList() ? { marginTop: "40px" } : {}} className={st.tasks}>
						{tasks.map((task, id) => (
							<Task name={task.name} timeToDo={task.time} key={id} />
						))}
					</div>
				)}
			</div>
		</div>
	);
});
