import st from "./clearBtn.module.css";

export const ClearBtn = ({ clearTaskList }) => {
	return (
		<div className={st.btn_block}>
			<button onClick={clearTaskList} className={`${st.btn_clear} ${st.clear_txt}`}>
				Clear
			</button>
		</div>
	);
};
