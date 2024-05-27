import st from "./progressBar.module.css";

export const ProgressBar = ({ percentage, taskName }) => {
	return (
		<div className={st.task}>
			<p className={st.txt}>{taskName}</p>
			<div className={st.progress_bar}>
				<div className={st.progress_fill} style={{ width: `${percentage}%` }}>
					<div className={st.progress_wave}></div>
					<span className={st.progress_text}>{`${percentage}%`}</span>
				</div>
			</div>
		</div>
	);
};
