import st from "./taskList.module.css";
import { Task } from "../task/task";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { TaskInput } from "../taskInput/taskInput";

export const TaskList = observer(({ tasks, tasksType, clearList, setIsModalOpen }) => {
	const [isListEmpty, setIsListEmpty] = useState(true);
	const [isAddingTask, setIsAddingTask] = useState(false);

	const isEmpty = (list) => {
		if (list.length) setIsListEmpty(false);
		else setIsListEmpty(true);
	};

	useEffect(() => {
		isEmpty(tasks);
	}, [tasks.length]);

	const isNewTaskList = () => {
		return tasksType.toLowerCase() === "new";
	};

	return (
		<div className={st.taskList}>
			{(!isAddingTask || !isNewTaskList()) && (
				<button onClick={clearList} title="Delete all tasks" className={st.clearQueueBtn}>
					<img
						className={st.clearQueueIcon}
						src={"./icons/clearQueue.svg"}
						alt="Clear queue"
					/>
				</button>
			)}
			{!isAddingTask && isNewTaskList() && (
				<button
					onClick={() => {
						setIsModalOpen(true);
					}}
					title="Generate tasks"
					className={`${st.clearQueueBtn} ${st.generateTasksBtn}`}
				>
					<img
						className={st.clearQueueIcon}
						src={"./icons/generate.svg"}
						alt="Generate tasks"
					/>
				</button>
			)}
			<div className={isListEmpty ? st.empty_list : st.list}>
				{isNewTaskList() && (
					<TaskInput isAddingTask={isAddingTask} setIsAddingTask={setIsAddingTask} />
				)}
				{isListEmpty ? (
					<div className={st.txt}>
						<p className={st.empty_txt}>The {tasksType} tasks </p>
						<p className={st.empty_txt}>will be located here</p>
					</div>
				) : (
					<ul className={st.tasks}>
						{tasks.map((task, id) => (
							<Task name={task.name} timeToDo={task.time} key={id} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
});
