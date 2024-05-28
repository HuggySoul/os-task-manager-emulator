import st from "./clearBtn.module.css";
import TasksStore from "../../store/toDo";

export const ClearBtn = ({ clearTaskList }) => {
	console.log("Clear", TasksStore.tasksToDo);
	return (
		<div className={st.btn_block}>
			<button onClick={clearTaskList} className={`${st.btn_clear} ${st.clear_txt}`}>
				Clear
			</button>
		</div>
	);
};
