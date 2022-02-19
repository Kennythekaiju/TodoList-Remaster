import React, { useState, useEffect } from "react";

//include images into your bundle

//create your first component
const TodoList = () => {
	const [list, setList] = useState([]);
	const [task, setTask] = useState("");
	const [input, setInput] = useState("");

	// const getAllTodos = async function () {
	// 	const options = {
	// 		method: "GET",
	// 	};
	// 	const response = await fetch(
	// 		"https://assets.breatheco.de/apis/fake/todos/user/KaijuTodo",
	// 		options
	// 	);
	// 	setList(await response.json());
	// 	console.log(response);
	// };

	// useEffect(() => {
	// 	getAllTodos();
	// }, []);

	// const saveTodos = async (newTodos) => {
	// 	const options = {
	// 		method: "PUT",
	// 		body: JSON.stringify(newTodos),
	// 		headers: { "content-type": "application/json" },
	// 	};
	// 	const response = await fetch(
	// 		"https://assets.breatheco.de/apis/fake/todos/user/KaijuTodo",
	// 		options

	// 	);
	// };
	//function for handling the enter event for Todolist
	const handleInput = (pressedKey) => {
		if (pressedKey.keyCode == 13) {
			if (input.trim() === "") {
				alert("Sorry, add task please.");
				setInput("");
			} else {
				setList([...list, { label: task, done: false }]);
				setTask("");
				setInput("");
				saveTodos([...list, { label: task, done: false }]);
			}
		}
	};
	const getTodos = async () => {
		const options = {
			method: "GET",
		};
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/KaijuTodo",
			options
		);
		setList(await response.json());
	};

	useEffect(() => {
		getTodos();
	}, []);

	const saveTodos = async (newTodos) => {
		console.log(newTodos);
		const options = {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: { "content-type": "application/json" },
		};
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/KaijuTodo",
			options
		);
		return response;
	};
	//filter functionality, pass all todos that are not equal to that item
	// const deleter = (task) => {
	// 	let filteredTasks = list.filter((item) => item != task);
	// 	setList(filteredTasks);
	// 	saveTodos([...filteredTasks, { label: task, done: false }]);
	// };

	return (
		<div className="mainContent">
			<h1 className="fw-light title opacity-25">Todos</h1>
			<div className="listDiv">
				<div className="inputBox">
					<input
						className="form-control"
						type="text"
						value={input}
						placeholder={
							list.length === 0
								? "No tasks, add a task"
								: "What needs to be done?"
						}
						onKeyDown={(keyDown) => handleInput(keyDown)}
						onChange={(inputKeyPress) => {
							setTask(inputKeyPress.target.value);
							setInput(inputKeyPress.target.value);
						}}></input>
				</div>

				<div className="w-100 h-100">
					<ul className="list-group">
						{list.map((singleTask, i) => {
							return (
								<li
									className="d-flex justify-content-between ps-5 py-2 text-muted fw-light fs-5"
									key={i}>
									{singleTask.label}
									<div
										style={{ cursor: "pointer" }}
										onClick={() => {
											setList(
												list.filter(
													(_item, p) => p !== i
												)
											);
											saveTodos(
												list.filter(
													(_item, p) => p !== i
												)
											);
										}}
										className="todoDelete">
										x
									</div>{" "}
								</li> //When icon is clicked (deleter function is ran), all todos are returned except the singleTodo passed to the function
							);
						})}
					</ul>

					<div className="ps-3 py-2 fw-light text-start" id="footer">
						<span id="footerText">
							{list.length} {list.length === 1 ? "item" : "items"}{" "}
							left
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoList;
