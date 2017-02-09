'use strict';
import React, {
	Component
} from 'react';
import {
	render
} from 'react-dom';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';

const db = {
	get: key => JSON.parse(localStorage.getItem(key)),
	set: (key, val) => {
		val = JSON.stringify(val);
		localStorage.setItem(key, val);
	}
}

class App extends Component {
	constructor(props) {
		super();
		this.db = db;
		this.state = {
			todos: this.db.get('todos') || [],
			isAllChecked: false
		};
		this.addTodo = this.addTodo.bind(this)
	}

	allChecked() {
		let isAllChecked = false;

		if (this.state.todos.every(todo => todo.isDone)) {
			isAllChecked = true;
		};

		this.setState({
			todos: this.state.todos,
			isAllChecked: isAllChecked
		})
	}

	addTodo(todoItem) {
		this.state.todos.push(todoItem);
		this.db.set('todos', this.state.todos);
		this.allChecked();
	}

	deleteTodo(index) {
		this.state.todos.splice(index, 1);
		this.setState({
			todos: this.state.todos
		});
		this.db.set('todos', this.state.todos);
	}

	clearDone() {
		let todos = this.state.todos.filter(todo => !todo.isDone);

		this.setState({
			todos: todos,
			isAllChecked: false
		});

		this.db.set('todos', todos);
	}

	changeTodoState(index, isDone, isChangeAll = false) {
		if (isChangeAll) {
			this.setState({
				todos: this.state.todos.map((todo) => {
					todo.isDone = isDone;
					return todo;
				}),
				isAllChecked: isDone
			});
		} else {
			this.state.todos[index].isDone = isDone;
			this.allChecked();
		}

		this.db.set('todos', this.state.todos);
	}

	render() {
		let info = {
			isAllChecked: this.state.isAllChecked,
			todoCount: this.state.todos.length || 0,
			todoDoneCount: (this.state.todos && this.state.todos.filter(todo => todo.isDone)).length || 0
		};

		return (
			<div className="todo-wrap">
				<TodoHeader addTodo={this.addTodo} />
				<TodoMain todos={this.state.todos} deleteTodo={this.deleteTodo.bind(this)} changeTodoState={this.changeTodoState.bind(this)} />
				<TodoFooter {...info} changeTodoState={this.changeTodoState.bind(this)} clearDone={this.clearDone.bind(this)} />
			</div>
		);
	}
}

render(<App />, document.getElementById('app'));