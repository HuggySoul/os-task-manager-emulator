import st from "./btn.module.css";

export const Btn = ({ title, action, color, btnRef = null }) => {
	return (
		<button
			ref={btnRef}
			style={{ backgroundColor: color }}
			onClick={action}
			className={st.btn}
		>
			<p>{title}</p>
		</button>
	);
};
