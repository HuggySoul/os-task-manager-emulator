import { makeAutoObservable } from "mobx";

class Tasks {
	tasksToDo = [];
	completedTasks = [
		{ name: "Task1", time: 10 },
		{ name: "Task2", time: 20 },
		{ name: "Task3", time: 30 },
		{ name: "Task4", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 100 },
	];
	tasksInProcess = [
		{ name: "Task1", time: 10 },
		{ name: "Task2", time: 20 },
		{ name: "Task3", time: 30 },
		{ name: "Task4", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 40 },
		{ name: "Task5", time: 100 },
	];

	constructor() {
		makeAutoObservable(this);
	}

	addNewTask(task) {
		this.tasksToDo.push(task);
	}

	addCompletedTask(task) {
		this.tasksToDo.push(task);
	}

	clearCompletedTaskList() {
		this.completedTasks = [];
	}

	clearTaskToDoList() {
		this.tasksToDo = [];
	}
}

export default new Tasks();
