import st from "./quantumInput.module.css";
import inputIcon from "./assets/inputIcon.svg";

export const QuantumInput = () => {
	return (
		<div className={st.quantum}>
			<input
				type="number"
				className={`${st.input} ${st.input_time}`}
				placeholder="quantum"
			/>
			<button className={st.submitBtn}>
				<img className={st.submitImg} src={inputIcon} alt="Записать квант времени" />
			</button>
		</div>
	);
};
