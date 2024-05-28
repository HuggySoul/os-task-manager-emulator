import st from "./quantumInput.module.css";
import inputIcon from "./assets/inputIcon.svg";
import { useState } from "react";
import TasksStorage from "../../store/toDo";
import { observer } from "mobx-react-lite";

export const QuantumInput = observer(() => {
	const [quantum, setQuantum] = useState(1);
	const [attention, setAttention] = useState(false);

	const setQuantumStorage = () => {
		TasksStorage.quantum = quantum;
	};

	const setWarning = () => {
		if (quantum <= 0) setAttention(true);
		else setAttention(false);
	};

	return (
		<div className={st.quantum_block}>
			<div className={st.quantum}>
				<input
					type="number"
					className={`${st.input} ${st.input_time}`}
					placeholder="quantum"
					onChange={(e) => {
						setWarning();
						setQuantum(e.target.value);
					}}
				/>
				<button onClick={setQuantumStorage} className={st.submitBtn}>
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
