import st from "./taskList.module.css";

export const TaskList = ({ children, tasks }) => {
	return <div className={st.list}>{children}</div>;
};
