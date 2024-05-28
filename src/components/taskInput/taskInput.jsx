import st from "./taskInput.module.css";
import inputIcon from "./assets/inputIcon.svg";
import TasksStore from "../../store/toDo";
import { useState } from "react";

export const TaskInput = () => {
	const [task, setTask] = useState({});

	const addTask = () => {
		TasksStore.addNewTask(task);
	};

	return (
		<div className={st.input_Block}>
			<input
				type="text"
				className={`${st.input} ${st.input_name}`}
				placeholder="Task name"
				onChange={(e) => {
					const time = task?.time;
					const newTask = { name: e.target.value, time: time };
					setTask(newTask);
				}}
			/>
			<input
				type="number"
				className={`${st.input} ${st.input_time}`}
				placeholder="Time"
				onChange={(e) => {
					const name = task?.name;
					const newTask = { name: name, time: e.target.value };
					setTask(newTask);
				}}
			/>
			<button onClick={addTask} className={st.submitBtn}>
				<img className={st.submitImg} src={inputIcon} alt="Добавить задачу" />
			</button>
		</div>
	);
};
