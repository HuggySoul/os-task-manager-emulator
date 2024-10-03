import { makeAutoObservable } from "mobx";

class TaskStorage {
	tasksToDo = []; // новые задачи, готовые к выполнению
	MAX_QUEUE_QUANTITY = 1; //максимальное количество очередей для текущего набора задач и кванта
	MAX_TIME = 1; //время максимального выполнения задачи в текущем списке
	completedTasks = []; //завершённые задачи
	tasksInProcess = []; //список очередей с выполняемыми задачами

	quantum = 100; // квант
	//флаг необходимый для корректного изменения состояния при изменениях в tasksInProcess
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

	clearCompletedTaskList() {
		this.completedTasks = [];
	}

	clearTaskToDoList() {
		this.tasksToDo = [];
		this.MAX_TIME = 0;
	}

	//определяем максимальное количество очередей
	//для текущего набора задач
	setMaxQueueQuantity() {
		this.MAX_QUEUE_QUANTITY = Math.ceil(this.MAX_TIME / this.quantum);
	}
	//задаём максимальное время текущего списка задач
	setMaxTime(time) {
		if (Number(time) > this.MAX_TIME) this.MAX_TIME = time;
	}
}

export default new TaskStorage();
