import st from "./taskInput.module.css";
import inputIcon from "./assets/inputIcon.svg";

export const TaskInput = () => {
	return (
		<div className={st.input_Block}>
			<input
				type="text"
				className={`${st.input} ${st.input_name}`}
				placeholder="Task name"
			/>
			<input
				type="number"
				className={`${st.input} ${st.input_time}`}
				placeholder="Time"
			/>
			<button className={st.submitBtn}>
				<img className={st.submitImg} src={inputIcon} alt="Добавить задачу" />
			</button>
		</div>
	);
};
