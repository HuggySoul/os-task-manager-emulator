import { makeAutoObservable } from "mobx";

class TaskStorage {
	tasksToDo = [];
	completedTasks = [
		// { name: "Task1", time: 10 },
		// { name: "Task2", time: 20 },
		// { name: "Task3", time: 30 },
		// { name: "Task4", time: 40 },
		// { name: "Task5", time: 40 },
		// { name: "Task5", time: 40 },
		// { name: "Task5", time: 40 },
		// { name: "Task5", time: 40 },
		// { name: "Task5", time: 40 },
		// { name: "Task5", time: 40 },
		// { name: "Task5", time: 40 },
		// { name: "Task5", time: 100 },
	];
	tasksInProcess = [[]];

	quantum = 0;

	constructor() {
		makeAutoObservable(this);
	}

	addNewTask(task) {
		this.tasksToDo.push(task);
	}

	addCompletedTask(task) {
		this.tasksToDo.push(task);
	}

	addProcessingTask(task) {
		this.tasksInProcess.push(task);
	}

	clearCompletedTaskList() {
		this.completedTasks = [];
	}

	clearTaskToDoList() {
		this.tasksToDo = [];
	}
}

export default new TaskStorage();
