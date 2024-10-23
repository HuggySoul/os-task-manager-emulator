import { useState, useEffect } from "react";
import st from "./warning.module.css";
import { observer } from "mobx-react-lite";

export const Warning = observer(({ messageTxt, closeWarning }) => {
	const [isHidden, setIsHidden] = useState(false); // стейт для анимации

	useEffect(() => {
		if (!messageTxt) return;

		setIsHidden(false);

		const hideTimeout = setTimeout(() => {
			setIsHidden(true);
		}, 7000);

		const closeTimeout = setTimeout(() => {
			closeWarning();
		}, 8000);

		return () => {
			clearTimeout(hideTimeout);
			clearTimeout(closeTimeout);
		};
	}, [messageTxt]);

	return (
		<>
			{messageTxt && (
				<div className={`${st.warning} ${isHidden && st.hideWarning}`}>
					<div className={st.info}>
						<div className={st.stripe}></div>
						<img src="./icons/warning.svg" width={"50px"} alt="Warning" />
						<div className={st.warningText}>
							<p>Warning!</p>
							<span>{messageTxt}</span>
						</div>
					</div>
					<button onClick={closeWarning} className={st.closeBtn}>
						<img src="./icons/close.svg" width={"20px"} alt="Close popup" />
					</button>
				</div>
			)}
		</>
	);
});
