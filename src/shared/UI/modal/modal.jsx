import st from "./modal.module.css";

export const Modal = ({ children }) => {
	return <dialog className={st.modal}>{children}</dialog>;
};
