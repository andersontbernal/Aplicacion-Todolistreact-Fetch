import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
	const [valor, setValor] = useState("");
	const [lista, setLista] = useState([]);

	// function crearUsuario() {
	// 	return fetch("https://playground.4geeks.com/todo/users/andersontbernal", {
	// 		method: "POST",
	// 		headers: {"Content-Type": "application/json"},
			
	// 	});
		
	// }


	function okListaDeTareas(params) {
		fetch('https://playground.4geeks.com/todo/users/andersontbernal', { method: "GET" })// buscar informacion en la url
			.then((response) => {
				return response.json()
			}) // si llega una respuesta prometo que la convierto en un formato utilizable JSON
			.then((data) => setLista(data.todos))
			//.then((data)=>setCharacters(data.results)) // Prometo que si el formato a json sale bien lo guardo en un espacio
			
			.catch((error) => console.log(error)) // si algo sale, lo aviso
	}

	// function agregarTarea(label) {
	// 	const nueva = {
	// 		label: label, 
	// 		done: false
	// 	};
	// 	fetch("https://playground.4geeks.com/todo/todos/andersontbernal", {
	// 		method: "POST",
	// 		headers: {"Content-Type": "application/json"},
	// 		body: JSON.stringify(nueva)
	// 	})
	// 	.then(res => {

	// 	})
	// }

	function createTask(tarea) {
		let task = {
				"label": tarea,
				"is_done": false
			} 
		let nuevaTarea = [...lista, task]

		fetch('https://playground.4geeks.com/todo/todos/andersontbernal',{
			method: "POST",
			body: JSON.stringify(nuevaTarea),
			headers:{
				"Content-Type": "application/json"
			}
		})
		.then((response)=>{
			console.log(response);
			response.json()
		})					
		.then(()=>{
			okListaDeTareas()
		})
		.catch((error)=>console.log(error))

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
						onKeyDown={(evento) => {
							if (evento.key === "Enter" ) {
								createTask(valor)
							}
						}}
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
