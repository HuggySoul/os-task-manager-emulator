import st from "./app.module.css";
import { QuantumInput } from "./components/quantumInput/quantumInput";
import { ProcessList } from "./components/processList/processList";
import taskScheduler from "./features/taskScheduler";
import { TestGenerator } from "./components/testGenerator/testGenerator";
import { useRef, useState } from "react";
import { Btn } from "./shared/UI";
import { TaskList } from "./components/taskList/taskList";
import TasksStore from "./store/taskStorage";
import { observer } from "mobx-react-lite";

const App = observer(() => {
	//флаг для открытия окна с генерацией тестов
	const [isGenVisible, setIsGenVisible] = useState(false);
	const testBtnRef = useRef(null); //ссылка нужна для логики закрытия окна генерации тестов
	return (
		<div className={st.main}>
			<div className={st.tasks_menu}>
				<TaskList
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
				{isGenVisible ? (
					<TestGenerator openBtnRef={testBtnRef} setVisibleFlag={setIsGenVisible} />
				) : (
					<></>
				)}
				<QuantumInput />
				<Btn title={"Execute"} action={taskScheduler.execute} color={"#233ea9"} />
				<Btn title={"Auto start"} action={taskScheduler.autoComplete} color={"#233ea9"} />
				<Btn
					btnRef={testBtnRef}
					title={"Auto test-gen"}
					action={() => setIsGenVisible(!isGenVisible)}
					color={"#ff6f61"}
				/>
			</div>
		</div>
	);
});

export default App;
