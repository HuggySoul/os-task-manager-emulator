import st from "./taskInput.module.css";
import TasksStore from "../../store/taskStorage";
import { useRef } from "react";

export const TaskInput = ({ isAddingTask, setIsAddingTask }) => {
	const nameInput = useRef(null);
	const timeInput = useRef(null);

	const onKeyDownHandler = (event) => {
		if (event.key === "Escape") setIsAddingTask(false);
		if (event.key === "Enter" && !timeInput.current.value) timeInput.current.focus();
		if (event.key === "Enter" && !nameInput.current.value) nameInput.current.focus();

		if (event.key === "Enter" && nameInput.current.value && timeInput.current.value)
			addTask();
	};

	const addTask = () => {
		const name = nameInput.current.value;
		const time = timeInput.current.value;
		if (time && name) {
			setIsAddingTask(false);
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
						<img className={st.addTaskIcon} src={"./icons/add.svg"} alt="Add task Icon" />
						<p>Add new task</p>
					</button>
				</div>
			)}
			{isAddingTask && (
				<div className={st.newTask}>
					<input
						autoFocus
						ref={nameInput}
						type="text"
						className={`${st.input} ${st.input_name}`}
						placeholder="Enter the task name"
						onKeyDown={onKeyDownHandler}
					/>
					<div className={st.lowerBlock}>
						<input
							min={1}
							ref={timeInput}
							type="number"
							className={`${st.input} ${st.input_time}`}
							placeholder="Enter the execution time"
							onKeyDown={onKeyDownHandler}
						/>
						<button
							onClick={addTask}
							className={`${st.addTaskBtn} ${st.internalAddTaskBtn}`}
						>
							<img
								className={st.addTaskIcon}
								src={"./icons/add.svg"}
								alt="Add task Icon"
							/>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
