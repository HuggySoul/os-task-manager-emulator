import st from "./taskList.module.css";
import { Task } from "../task/task";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Btn } from "../../shared/UI";
import { TaskInput } from "../taskInput/taskInput";

export const TaskList = observer(({ tasks, tasksType, clearList }) => {
	const [isListEmpty, setIsListEmpty] = useState(true);

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
			{isNewTaskList() ? <TaskInput /> : <></>}
			<div
				style={isNewTaskList() ? {} : { marginTop: "44px" }}
				className={isListEmpty ? st.empty_list : st.list}
			>
				{isListEmpty ? (
					<>
						<p className={st.empty_txt}>The {tasksType} tasks </p>
						<p className={st.empty_txt}>will be located here</p>
					</>
				) : (
					tasks.map((task, id) => <Task name={task.name} timeToDo={task.time} key={id} />)
				)}
			</div>
			<Btn title={"Clear list"} color={"#233ea9"} action={clearList} />
		</div>
	);
});
