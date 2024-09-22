import st from "./taskInput.module.css";
import addTaskIcon from "./assets/addTaskIcon.svg";
// import clearQueueIcon from "./assets/clearQueueIcon.svg";
import TasksStore from "../../store/taskStorage";
import { useEffect, useState, useRef } from "react";

export const TaskInput = ({ isAddingTask, setIsAddingTask }) => {
	const nameInput = useRef(null);
	const timeInput = useRef(null);

	useEffect(() => {
		const setInputActive = () => {
			if (isAddingTask) nameInput.current.focus();
		};
		setInputActive();

		const listener = (event) => {
			if (event.key === "Escape") setIsAddingTask(false);
			if (event.key === "Enter" && !timeInput.current.value) timeInput.current.focus();
			if (event.key === "Enter" && nameInput.current.value && timeInput.current.value)
				addTask();
		};

		if (isAddingTask) {
			document.addEventListener("keydown", listener);
			return () => {
				document.removeEventListener("keydown", listener);
			};
		}
	}, [isAddingTask]);

	const addTask = () => {
		const name = nameInput.current.value;
		const time = timeInput.current.value;
		if (time && name) {
			setIsAddingTask(false);
			TasksStore.setMaxTime(time);
			TasksStore.setMaxQueueQuantity();
			TasksStore.addNewTask({
				name: name,
				time: time,
			});
		}
	};

	return (
		<div className={st.input_Block}>
			{!isAddingTask && (
				<div className={st.topBtns}>
					<button
						onClick={() => setIsAddingTask(!isAddingTask)}
						className={st.addTaskBtn}
					>
						<img className={st.addTaskIcon} src={addTaskIcon} alt="Add task Icon" />
						<p>Add new task</p>
					</button>
				</div>
			)}
			{isAddingTask && (
				<div className={st.newTask}>
					<input
						ref={nameInput}
						type="text"
						className={`${st.input} ${st.input_name}`}
						placeholder="Enter the task name"
					/>
					<div className={st.lowerBlock}>
						<input
							ref={timeInput}
							type="number"
							className={`${st.input} ${st.input_time}`}
							placeholder="Enter the execution time"
						/>
						<button
							onClick={addTask}
							className={`${st.addTaskBtn} ${st.internalAddTaskBtn}`}
						>
							<img className={st.addTaskIcon} src={addTaskIcon} alt="Add task Icon" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
