import React, { useState } from "react";

//include images into your bundle

//create your first component
const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");

	//function for handling the enter event for Todolist
	const handleInput = (e) => {
		if (e.code === "Enter") {
			e.preventDefault();

			setTodos([...todos, e.target.value]); //concats old todos with the user input; modifying todos to new todo state
			setInput("");
		}
	};
	//filter functionality, pass all todos that are not equal to that item
	const deleter = (todo) => {
		let filteredTodos = todos.filter((item) => item != todo);
		setTodos(filteredTodos);
	};

	return (
		<div className="mainContent">
			<h1 className="fw-light title opacity-25">Todos</h1>
			<div className="listDiv">
				<div className="inputBox">
					<input
						className="form-control"
						type="text"
						placeholder={
							todos.length === 0
								? "No tasks, add a task"
								: "What needs to be done?"
						} //conditional rendering
						onChange={(event) => setInput(event.target.value)} //need more understanding
						onKeyDown={(e) => {
							handleInput(e);
						}}
						value={input}
					/>
				</div>

				<div className="w-100 h-100">
					<ul className="list-group">
						{todos.map((singleTodo, i) => {
							return (
								<li
									className="d-flex justify-content-between ps-5 py-2 text-muted fw-light fs-5"
									key={i}>
									{singleTodo}{" "}
									<div
										onClick={() => deleter(singleTodo)}
										style={{ cursor: "pointer" }}
										className="todoDelete">
										X
									</div>{" "}
								</li> //When icon is clicked (deleter function is ran), all todos are returned except the singleTodo passed to the function
							);
						})}
					</ul>
					<div className="ps-3 py-2 fw-light text-start" id="footer">
						<span id="footerText">
							{todos.length}{" "}
							{todos.length === 1 ? "item" : "items"} left
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoList;
