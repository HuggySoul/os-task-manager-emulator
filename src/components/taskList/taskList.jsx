import st from "./taskList.module.css";

export const TaskList = ({ children }) => {
	return <div className={st.list}>{children}</div>;
};
