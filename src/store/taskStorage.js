import { makeAutoObservable } from "mobx";

class TaskStorage {
	tasksToDo = []; // новые задачи, готовые к выполнению
	MAX_QUEUE_QUANTITY = 1; //максимальное количество очередей для текущего набора задач и кванта
	MAX_TIME = 1; //время максимального выполнения задачи в текущем списке
	completedTasks = []; //завершённые задачи

	tasksInProcess = []; //список задач, выполняемых в данный момент
	indexesOfTasksInProcess = []; //список очередей с индексами задач для выполнения

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
		this.setMaxTime(task.time);
		this.tasksToDo.push(task);
	}

	addCompletedTask(task) {
		this.completedTasks.push(task);
	}

	clearCompletedTaskList() {
		this.completedTasks = [];
	}

	clearTaskToDoList() {
		this.tasksToDo = [];
		this.resetMaxTime();
	}

	addTaskInProcess(task) {
		this.tasksInProcess.push(task);
	}

	removeTaskFromProcess(index) {
		//удаляем через delete, чтобы избежать переиндексации
		//и позволить движку оптимальнее работать с массивом
		delete this.tasksInProcess[index];
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

	resetMaxTime() {
		this.MAX_TIME = 0;
	}

	setQuantum(quantum) {
		this.quantum = quantum;
	}
}

export default new TaskStorage();
