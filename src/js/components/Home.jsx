import React, { useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
	const [valor, setValor] = useState("");
	const [datos, setDatos] = useState([]);

	return (
		<div className="container">
			<h1>Datos</h1>
			<ul>
				<li>
					<input 
						type="text" 
						onChange={(evento) => setValor(evento.target.value)}
						value={valor}
						onKeyDown={(evento) => {
							if (evento.key === "Enter" && valor.trim() !== "") {
								setDatos([...datos, valor]);
								setValor("");
							}
						}}
						placeholder="What you need to be done?"
					/>
				</li>

				{datos.map((item, index) => (
					<li key={index}>
						{item}{" "}
						<i 
							className="fa-solid fa-circle-xmark"
							style={{ color: "red", cursor: "pointer" }}
							onClick={() => {
								setDatos(datos.filter((_, i) => i !== index));
							}}
						></i>
					</li>
				))}
			</ul>

			<div>{datos.length} item{datos.length !== 1 ? "s" : ""} </div>
		</div>
	);
};

export default Home;
