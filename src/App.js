import st from "./app.module.css";
import { QuantumInput } from "./components/quantumInput/quantumInput";
import { NewTasks } from "./components/newTasks/newTasks";
import { ProcessList } from "./components/processList/processList";
import { CompletedTasks } from "./components/completedTasks/completedTasks";
import taskScheduler from "./features/taskScheduler";

function App() {
	return (
		<div className={st.main}>
			<div className={st.tasks_menu}>
				<NewTasks />
				<ProcessList />
				<CompletedTasks />
			</div>
			<div className={st.start_btns}>
				<QuantumInput />
				<button
					onClick={() => taskScheduler.getNextTask()}
					className={`${st.submitBtn} ${st.txt}`}
				>
					Execute
				</button>
				<button
					onClick={() => taskScheduler.getAllTasks()}
					className={`${st.submitBtn} ${st.txt}`}
				>
					Auto start
				</button>
				<button className={`${st.submitBtn} ${st.txt} ${st.testGenBtn}`}>
					Auto test-gen
				</button>
			</div>
		</div>
	);
}

export default App;
