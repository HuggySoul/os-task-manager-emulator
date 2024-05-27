import st from "./clearBtn.module.css";

export const ClearBtn = () => {
	return (
		<div className={st.btn_block}>
			<button className={`${st.btn_clear} ${st.clear_txt}`}>Clear</button>
		</div>
	);
};
