import st from "./quantumInput.module.css";
import inputIcon from "./assets/inputIcon.svg";
import { useState, useEffect, useRef } from "react";
import TasksStorage from "../../store/toDo";
import { observer } from "mobx-react-lite";

export const QuantumInput = observer(() => {
	const [quantum, setQuantum] = useState(1);
	const [attention, setAttention] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		//при нажатии enter сохраняем квант в хранилище
		const listener = (event) => {
			if (
				document.activeElement === inputRef.current &&
				(event.code === "Enter" || event.code === "NumpadEnter")
			) {
				event.preventDefault();
				setQuantumStorage();
				setWarning(TasksStorage.quantum);
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [quantum]);

	//устанавливаем значение кванта в хранилище
	const setQuantumStorage = () => {
		TasksStorage.quantum = quantum;
		TasksStorage.setMaxQueueQuantity();
	};

	//устанавливаем состояние кванта в форме
	const SetQuantum = (quantumValue) => {
		setQuantum(quantumValue);
	};
	//показываем предупреждение o кванте <= 0
	const setWarning = (quantumValue) => {
		if (Number(quantumValue) <= 0) setAttention(true);
		else setAttention(false);
	};

	return (
		<div className={st.quantum_block}>
			<div className={st.quantum}>
				<input
					ref={inputRef}
					type="number"
					className={`${st.input} ${st.input_time}`}
					placeholder="quantum"
					onChange={(e) => {
						SetQuantum(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						setQuantumStorage();
						setWarning(quantum);
					}}
					className={st.submitBtn}
				>
					<img className={st.submitImg} src={inputIcon} alt="Записать квант времени" />
				</button>
				<div className={st.currentQuantum}>
					<p className={st.txt}>{TasksStorage.quantum}</p>
				</div>
			</div>
			{attention ? (
				<p className={`${st.txt} ${st.attentionTxt}`}>
					*The quantum must be greater than zero
				</p>
			) : (
				<></>
			)}
		</div>
	);
});
