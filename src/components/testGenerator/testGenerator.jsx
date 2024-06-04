import st from "./testGenerator.module.css";
import TasksStore from "../../store/toDo";
import { useRef, useState, useEffect } from "react";

export const TestGenerator = ({ setVisibleFlag, openBtnRef }) => {
	const [taskQuantity, setTaskQuantity] = useState(0);
	const [timeMin, setTimeMin] = useState(0);
	const [timeMax, setTaskTimeMax] = useState(0);
	const modalRef = useRef(null); //ссылка нужна для логики закрытия

	useEffect(() => {
		//закрываем окно при нажатии вне его и кнопки, которая его открывает
		const handleClickOutside = (event) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target) &&
				!openBtnRef.current.contains(event.target)
			) {
				setVisibleFlag(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setVisibleFlag]);

	const generateTimeInRange = () => {
		const time = Number(Math.random() * (timeMax - timeMin) + timeMin).toFixed(3);
		TasksStore.setMaxTime(time);
		TasksStore.setMaxQueueQuantity();
		return time;
	};
	const generateTasks = () => {
		for (let i = 1; i <= taskQuantity; i++)
			TasksStore.addNewTask({ name: `Task${i}`, time: generateTimeInRange() });
	};

	return (
		<div ref={modalRef} className={st.modal}>
			<div className={st.head_block}>
				<p className={st.txt}>Test generation</p>
			</div>
			<p className={`${st.txt} ${st.txt_small}`}>Enter the number of tasks:</p>
			<div className={st.input_block}>
				<input
					type="number"
					className={`${st.input} ${st.input_tasks}`}
					placeholder="number of tasks"
					onChange={(e) => {
						setTaskQuantity(e.target.value);
					}}
				/>
			</div>
			<p className={`${st.txt} ${st.txt_small}`}>Enter the range to generate the time:</p>
			<div className={st.time_range}>
				<input
					type="number"
					className={`${st.input} ${st.input_tasks}`}
					placeholder="from"
					onChange={(e) => {
						setTimeMin(e.target.value);
					}}
				/>
				<input
					type="number"
					className={`${st.input} ${st.input_tasks}`}
					placeholder="to"
					onChange={(e) => {
						setTaskTimeMax(e.target.value);
					}}
				/>
			</div>

			<div className={st.btn_block}>
				<button
					onClick={() => {
						setVisibleFlag(false);
					}}
					className={`${st.btn} ${st.btn_cancel}`}
				>
					Cancel
				</button>
				<button
					onClick={() => {
						generateTasks();
						setVisibleFlag(false);
					}}
					className={`${st.btn} ${st.btn_gen}`}
				>
					Generate
				</button>
			</div>
		</div>
	);
};
