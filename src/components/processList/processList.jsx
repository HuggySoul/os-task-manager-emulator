import st from "./processList.module.css";
import { ProgressBar } from "../progressBar/progressBar";
import TasksStore from "../../store/taskStorage";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

export const ProcessList = observer(() => {
	const [isListEmpty, setIsListEmpty] = useState(true);

	useEffect(() => {
		checkEmpty();
	}, [TasksStore.changeFlag]);

	const checkEmpty = () => {
		if (TasksStore.tasksInProcess.length) setIsListEmpty(false);
		else setIsListEmpty(true);
	};

	return (
		<div className={st.processor}>
			<div className={isListEmpty ? st.empty_List : st.list}>
				{isListEmpty ? (
					<>
						<p className={st.empty_txt}>The processes that are running</p>
						<p className={st.empty_txt}>will be located here</p>
					</>
				) : (
					TasksStore.tasksInProcess.map((queue) => {
						return queue.map((task) => {
							return <ProgressBar percentage={task.percentage} taskName={task.name} />;
						});
					})
				)}
			</div>
		</div>
	);
});
