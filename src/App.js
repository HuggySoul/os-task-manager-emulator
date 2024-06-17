import st from "./app.module.css";
import { QuantumInput } from "./components/quantumInput/quantumInput";
import { NewTasks } from "./components/newTasks/newTasks";
import { ProcessList } from "./components/processList/processList";
import { CompletedTasks } from "./components/completedTasks/completedTasks";
import taskScheduler from "./features/taskScheduler";
import { TestGenerator } from "./components/testGenerator/testGenerator";
import { useRef, useState } from "react";
import { Footer } from "./components/footer/footer";
import { Btn } from "./shared/UI";

function App() {
	//флаг для открытия окна с генерацией тестов
	const [isGenVisible, setIsGenVisible] = useState(false);
	const testBtnRef = useRef(null); //ссылка нужна для логики закрытия окна генерации тестов

	return (
		<div className={st.main}>
			<div className={st.tasks_menu}>
				<NewTasks />
				<ProcessList />
				<CompletedTasks />
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
			<Footer />
		</div>
	);
}

export default App;
