import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
	const [valor, setValor] = useState("");
	const [lista, setLista] = useState([]);

	function okListaDeTareas(params) {
		fetch('https://playground.4geeks.com/todo/users/andersontbernal', { method: "GET" })// buscar informacion en la url
			.then((response) => {
				return response.json()
			}) // si llega una respuesta prometo que la convierto en un formato utilizable JSON
			.then((data) => setLista(data.todos))
			//.then((data)=>setCharacters(data.results)) // Prometo que si el formato a json sale bien lo guardo en un espacio
			
			.catch((error) => console.log(error)) // si algo sale, lo aviso
	}
	useEffect(() => {
		okListaDeTareas()
	}, [])
	console.log(lista);
	
	return (
		<div className="container">
			<h1>Datos</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(evento) => setValor(evento.target.value)}
						value={valor}
						// onKeyDown={(evento) => {
						// 	if (evento.key === "Enter" && valor.trim() !== "") {
						// 		setDatos([...datos, valor]);
						// 		setValor("");
						// 	}
						// }}
						placeholder="What you need to be done?"
					/>
				</li>

				 {lista.map((item, index) => (
					<li key={index}>
						{item.label}{" "}
						<i
							className="fa-solid fa-circle-xmark"
							style={{ color: "red", cursor: "pointer" }}
							onClick={() => {
								setLista(lista.filter((_, i) => i !== index));
							}}
						></i>
					</li>
				))} 
			</ul>

			{/* <div>{datos.length} item{datos.length !== 1 ? "s" : ""} </div> */}
		</div>
	);
};

export default Home;
