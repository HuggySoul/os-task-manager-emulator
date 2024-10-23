import st from "./app.module.css";
import { ProcessList } from "./components/processList/processList";
import taskScheduler from "./features/taskScheduler";
import { TestGenerator } from "./components/testGenerator/testGenerator";
import { useState } from "react";
import { Btn } from "./shared/UI";
import { TaskList } from "./components/taskList/taskList";
import TasksStore from "./store/taskStorage";
import { observer } from "mobx-react-lite";
import { Modal } from "./shared/UI";
import { Warning } from "./shared/UI";

const App = observer(() => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
				<TestGenerator setIsVisible={setIsModalOpen} />
			</Modal>

			<main className={st.main}>
				<Warning
					messageTxt={TasksStore.warningMsg}
					closeWarning={() => TasksStore.clearWarning()}
				/>
				<div className={st.tasks_menu}>
					<TaskList
						setIsModalOpen={setIsModalOpen}
						tasks={TasksStore.tasksToDo}
						tasksType={"new"}
						// Передаём так, чтобы не терять контекст вызова метода
						clearList={() => TasksStore.clearTaskToDoList()}
					/>
					<ProcessList />
					<TaskList
						tasks={TasksStore.completedTasks}
						tasksType={"completed"}
						clearList={() => TasksStore.clearCompletedTaskList()}
					/>
				</div>
				<div className={st.start_btns}>
					<Btn
						title={"Execute"}
						action={taskScheduler.execute}
						color={"var(--primary-col)"}
					/>
					<Btn
						title={"Auto start"}
						action={taskScheduler.autoComplete}
						color={"var(--primary-col)"}
					/>
				</div>
			</main>
		</>
	);
});

export default App;
