import TaskStorage from "../store/toDo";

class TaskScheduler {
	newTasks = []; //первая очередь по приоритету
	processingTasks = []; //список обрабатываемых задач
	queueLength = []; //индекс - номер очереди(начинаем с 1), значение - количество эл-тов в очереди

	constructor(TaskList) {
		this.newTasks = TaskList;
	}

	getNextTask = () => {
		let task = TaskStorage.tasksToDo.shift();
		console.log(task);
		task.percentage = 0; // формируем свойство, показывающее степень выполнения процесса
		TaskStorage.tasksInProcess[0].push(task);
	};

	getAllTasks = () => {
		TaskStorage.tasksToDo.forEach((task) => {
			if (!TaskStorage.tasksInProcess[0]) TaskStorage.tasksInProcess.push([]);

			TaskStorage.tasksInProcess[0].push(task);
		});
	};

	taskProcessing = () => {
		let task = TaskStorage.tasksInProcess.shift();
	};

	downGradeTaskQueue = () => {};
}

export default new TaskScheduler();
