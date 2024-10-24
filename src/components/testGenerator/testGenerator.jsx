import st from "./testGenerator.module.css";
import TasksStore from "../../store/taskStorage";
import { useState, useEffect } from "react";
import { Btn } from "../../shared/UI";

export const TestGenerator = ({ setIsVisible }) => {
	const [taskQuantity, setTaskQuantity] = useState(1);
	const [timeMin, setTimeMin] = useState(1);
	const [timeMax, setTaskTimeMax] = useState(1);
	const [taskAttention, setTaskAttention] = useState(false);
	const [timeAttention, setTimeAttention] = useState(false);

	useEffect(() => {
		setTaskWarning(taskQuantity);
	}, [taskQuantity]);

	useEffect(() => {
		setTimeWarning(timeMin, timeMax);
	}, [timeMin, timeMax]);

	const setTaskWarning = (taskQuantity) => {
		if (!taskQuantity || taskQuantity < 0 || taskQuantity > 50) setTaskAttention(true);
		else setTaskAttention(false);
	};

	const setTimeWarning = (timeMin, timeMax) => {
		if (!timeMin || !timeMax || timeMax < 0 || timeMin < 0 || timeMin > timeMax)
			setTimeAttention(true);
		else setTimeAttention(false);
	};

	const generateTimeInRange = () => {
		const time = (Math.random() * (timeMax - timeMin) + timeMin).toFixed(3);
		TasksStore.setMaxTime(time);
		TasksStore.setMaxQueueQuantity();
		return time;
	};
	const generateTasks = () => {
		if (!taskAttention && !timeAttention) {
			for (let i = 1; i <= taskQuantity; i++)
				TasksStore.addNewTask({ name: `Task${i}`, time: generateTimeInRange() });

			setIsVisible(false);
		}
	};

	return (
		<div className={st.modal}>
			<div className={st.head_block}>
				<p className={st.txt}>Task generation</p>
			</div>
			<div className={st.generationForm}>
				<p className={`${st.txt}`}>Enter the number of tasks:</p>
				<div className={st.input_block}>
					<input
						type="number"
						className={`${st.input} ${st.input_tasks}`}
						placeholder="number of tasks"
						onChange={(e) => {
							setTaskQuantity(Number(e.target.value));
						}}
					/>
					<p className={`${st.txt} ${st.txt_small}`}>(MAX: 50 tasks)</p>
				</div>

				{taskAttention && (
					<p className={`${st.txt} ${st.txt_small} ${st.txt_attention}`}>
						*Enter correct task quantity
					</p>
				)}
				<p className={`${st.txt}`}>Enter the range to generate the time:</p>
				<div className={st.time_range}>
					<input
						type="number"
						className={`${st.input} ${st.input_tasks}`}
						placeholder="from"
						onChange={(e) => {
							setTimeMin(Number(e.target.value));
						}}
					/>
					<input
						type="number"
						className={`${st.input} ${st.input_tasks}`}
						placeholder="to"
						onChange={(e) => {
							setTaskTimeMax(Number(e.target.value));
						}}
					/>
				</div>
				{timeAttention && (
					<p className={`${st.txt} ${st.txt_small} ${st.txt_attention} ${st.txt_Down}`}>
						*Enter correct time range: min time {">"} max time
					</p>
				)}
			</div>
			<div className={st.btn_block}>
				<Btn
					title={"Cancel"}
					action={() => {
						setIsVisible(false);
					}}
					color={"#ff6f61"}
				/>
				<Btn title={"Generate"} action={generateTasks} color={"var(--primary-col)"} />
			</div>
		</div>
	);
};
