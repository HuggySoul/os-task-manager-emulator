import { makeAutoObservable } from "mobx";

class TaskStorage {
	tasksToDo = [];
	MAX_QUEUE_QUANTITY = 1; //максимальное количество очередей для текущего набора задач и кванта
	MAX_TIME = 1; //время максимального выполнения задачи в текущем списке
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

	//#todo: определять количество очередей на этапе добавления задач??

	tasksInProcess = [];

	quantum = 1;

	changeFlag = 0;

	constructor() {
		makeAutoObservable(this);
	}

	makeChange() {
		this.changeFlag += 1;
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
		this.MAX_TIME = 1;
	}

	setMaxQueueQuantity() {
		console.log("quantum:", this.quantum);
		console.log(this.MAX_TIME / this.quantum);
		this.MAX_QUEUE_QUANTITY = Math.ceil(this.MAX_TIME / this.quantum);
		console.log("MAX_QUEUE_QUANTITY", this.MAX_QUEUE_QUANTITY);
	}

	setMaxTime(time) {
		console.log("MAX_TIME:", this.MAX_TIME);
		console.log(time);
		if (Number(time) > this.MAX_TIME) {
			console.log("Пришедшее время: ", time);
			this.MAX_TIME = time;
		} else {
			console.log("нет");
		}
	}
}

export default new TaskStorage();
