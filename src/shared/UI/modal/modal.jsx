import st from "./modal.module.css";

export const Modal = ({ children, isOpen, setIsModalOpen }) => {
	return (
		Boolean(isOpen) && (
			<dialog
				onClick={() => {
					setIsModalOpen(false);
				}}
				className={st.modal}
			>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className={st.stopPropagation}
				>
					{children}
				</div>
			</dialog>
		)
	);
};
