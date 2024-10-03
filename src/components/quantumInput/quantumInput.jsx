import st from "./quantumInput.module.css";
import addIcon from "./assets/addIcon.svg";
import cpuIcon from "./assets/CPU.svg";
import { useState, useEffect } from "react";
import TasksStorage from "../../store/taskStorage";
import { observer } from "mobx-react-lite";

export const QuantumInput = observer(() => {
	const [quantum, setQuantum] = useState(1);
	const [attention, setAttention] = useState(false);
	const [isAddingQuantum, setIsAddingQuantum] = useState(false);

	useEffect(() => {
		setWarning(quantum);
	}, [quantum]);

	//устанавливаем значение кванта в хранилище
	const setQuantumStorage = (e) => {
		if (!attention) {
			//останавливаем всплытие события, чтобы внешняя кнопка не срабатывала
			//isAddingQuantum необходим, чтобы событие не останавливалось при сложенной кнопке
			isAddingQuantum && e?.stopPropagation();
			TasksStorage.quantum = quantum;
			//пересчитываем максимально возможное количество очередей
			TasksStorage.setMaxQueueQuantity();
			setIsAddingQuantum(false);
		}
	};

	//показываем предупреждение o кванте <= 0
	const setWarning = (quantumValue) => {
		if (quantumValue <= 0) setAttention(true);
		else setAttention(false);
	};

	const keyDownHandler = (e) => {
		if (e.code === "Escape") setIsAddingQuantum(false);
		else if (e.code === "Enter" || e.code === "NumpadEnter") setQuantumStorage(e);
	};
	return (
		<div className={st.quantum_block}>
			<button
				onClick={() => setIsAddingQuantum(true)}
				className={isAddingQuantum ? st.editingBtnMode : st.addQuantumBtn}
			>
				{!isAddingQuantum && <p>Set quantum</p>}
				{isAddingQuantum && (
					<input
						autoFocus
						min={1}
						onKeyDown={keyDownHandler}
						type="number"
						className={st.quantum_input}
						placeholder="Enter quantum"
						onChange={(e) => {
							setQuantum(Number(e.target.value));
						}}
					/>
				)}
				<button onClick={(e) => setQuantumStorage(e)}>
					<img className={st.addIcon} src={addIcon} alt="Add quantum" />
				</button>
			</button>
			<div className={st.quantum}>
				<div title="Current quantum" className={st.currentQuantum}>
					<p className={st.txt}>{TasksStorage.quantum}</p>
				</div>
				<img title="Current quantum" className={st.cpuIcon} src={cpuIcon} alt="Quantum" />
			</div>
			{attention && (
				<p className={`${st.txt} ${st.attentionTxt}`}>
					*The quantum must be greater than zero
				</p>
			)}
		</div>
	);
});
