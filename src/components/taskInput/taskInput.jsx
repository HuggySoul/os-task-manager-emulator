import st from "./taskInput.module.css";
import inputIcon from "./assets/inputIcon.svg";
import TasksStore from "../../store/taskStorage";
import { useEffect, useState, useRef } from "react";

export const TaskInput = () => {
	const [task, setTask] = useState({ name: "Task1", time: 1 });
	const [attention, setAttention] = useState(false);
	const inputRef1 = useRef(null);
	const inputRef2 = useRef(null);

	useEffect(() => {
		setWarning(task.time, task.name);
		//при нажатии enter сохраняем квант в хранилище
		const listener = (event) => {
			if (
				(document.activeElement === inputRef1.current ||
					document.activeElement === inputRef2.current) &&
				(event.code === "Enter" || event.code === "NumpadEnter")
			) {
				event.preventDefault();
				addTask();
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [task.time, task.name]);

	const addTask = () => {
		if (task.time && task.name) {
			TasksStore.setMaxTime(task.time);
			TasksStore.setMaxQueueQuantity();
			TasksStore.addNewTask(task);
		}
	};

	const setWarning = (time, name) => {
		if (!time || !name) setAttention(true);
		else setAttention(false);
	};

	return (
		<div className={st.attention}>
			<div className={st.input_Block}>
				<input
					ref={inputRef1}
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
					ref={inputRef2}
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
			{attention ? (
				<p className={st.attention_txt}>*Fill in the fields correctly</p>
			) : (
				<></>
			)}
		</div>
	);
};
