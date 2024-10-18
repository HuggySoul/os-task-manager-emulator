import st from "./warning.module.css";

export const Warning = ({ messageTxt, isOpen, setIsOpen }) => {
	return (
		<>
			{isOpen && (
				<div className={st.warning}>
					<div className={st.info}>
						<div className={st.stripe}></div>
						<img src="./icons/warning.svg" width={"50px"} alt="Warning" />
						<div className={st.warningText}>
							<p>Warning!</p>
							<span>{messageTxt}</span>
						</div>
					</div>
					<button onClick={() => setIsOpen(false)} className={st.closeBtn}>
						<img src="./icons/close.svg" width={"20px"} alt="Close popup" />
					</button>
				</div>
			)}
		</>
	);
};
