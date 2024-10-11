import st from "./processList.module.css";
import { ProgressBar } from "../progressBar/progressBar";
import TasksStore from "../../store/taskStorage";
import { observer } from "mobx-react-lite";
import { QuantumInput } from "../quantumInput/quantumInput";

export const ProcessList = observer(() => {
	const isAnyProcessTasks = () => {
		return TasksStore.tasksInProcess.some((task) => task !== undefined);
	};

	const isEmpty = isAnyProcessTasks();

	return (
		<div className={st.processor}>
			<div className={!isEmpty ? st.empty_List : st.list}>
				<QuantumInput />

				{!isEmpty ? (
					<>
						<p className={st.empty_txt}>The processes that are running</p>
						<p className={st.empty_txt}>will be located here</p>
					</>
				) : (
					<ul className={st.bars}>
						{TasksStore.tasksInProcess.map((task, i) => {
							return (
								<ProgressBar key={i} percentage={task.percentage} taskName={task.name} />
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
});
