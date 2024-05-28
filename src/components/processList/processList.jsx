import st from "./processList.module.css";
import { ProgressBar } from "../progressBar/progressBar";
import TasksStore from "../../store/toDo";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

let Tasks = [
	// { name: "Task1", time: 10 },
	// { name: "Task2", time: 20 },
	// { name: "Task3", time: 30 },
	// { name: "Task4", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 40 },
	// { name: "Task5", time: 100 },
];

export const ProcessList = observer(() => {
	const [isListEmpty, setIsListEmpty] = useState(true);
	const [taskToRender, setTaskToRender] = useState({});
	const [taskQueues, setTaskQueues] = useState([]);

	useEffect(() => {}, []);

	useEffect(() => {
		checkEmpty();
	}, [TasksStore.tasksInProcess.length]);

	const checkEmpty = () => {
		if (TasksStore.tasksInProcess.length) setIsListEmpty(false);
		else setIsListEmpty(true);
	};

	const autoStart = () => {
		for (let queueNum = 0; queueNum <= TasksStore.tasksInProcess.length - 1; queueNum++) {
			for (let task = 0; task <= TasksStore.tasksInProcess[queueNum].length - 1; task++) {
				let oneTimeFraction =
					TasksStore.quantum / TasksStore.tasksInProcess[queueNum][task].time;
				if (oneTimeFraction < 1) {
					if (!TasksStore.tasksInProcess[queueNum + 1])
						TasksStore.tasksInProcess.push([]);
					console.log("auto: 	", TasksStore.tasksInProcess[queueNum][task]);
					console.log(task);
					let notCompletedTask = TasksStore.tasksInProcess[queueNum][task].shift();
					notCompletedTask.percentage =
						notCompletedTask.percentage + oneTimeFraction * 100;
					TasksStore.tasksInProcess[queueNum + 1].push(notCompletedTask);
					return (
						<ProgressBar
							percentage={notCompletedTask.percentage}
							taskName={notCompletedTask.name}
						/>
					);
				} else {
					console.log("auto: 	", TasksStore.tasksInProcess[queueNum][task]);
					let completedTask = TasksStore.tasksInProcess[queueNum][task].shift();
					completedTask.percentage = 100;
					return (
						<ProgressBar
							percentage={completedTask.percentage}
							taskName={completedTask.name}
						/>
					);
				}
			}
		}
	};

	return (
		<div className={st.processor}>
			<p className={st.txt}>Processor</p>
			<div className={isListEmpty ? st.empty_List : st.list}>
				{isListEmpty ? (
					<>
						<p className={st.empty_txt}>The processes that are running</p>
						<p className={st.empty_txt}>will be located here</p>
					</>
				) : (
					autoStart()
					// TasksStore.tasksInProcess.map((task, id) => {
					// 	if (task.percentage < 100 && TasksStore.quantum > 0) {
					// 		task.percentage = task.percentage + (task.time / 100) * TasksStore.quantum;
					// 		task.percentage = task.percentage >= 100 ? 100 : task.percentage;
					// 	}
					// 	return (
					// 		<ProgressBar percentage={task.percentage} taskName={task.name} key={id} />
					// 	);
					// })
				)}
			</div>
		</div>
	);
});
