import TaskStorage from "../store/taskStorage";

class TaskScheduler {
	QueueNum = 0;

	getAllTasks = () => {
		TaskStorage.tasksToDo.forEach((task) => {
			if (!TaskStorage.tasksInProcess[0]) TaskStorage.tasksInProcess.push([]);

			TaskStorage.tasksInProcess[0].push(task);
		});
	};

	//берём задачи из списка для выполнения и помещаем в первую очередь
	getOneNewTask = () => {
		if (!TaskStorage.tasksInProcess[0]) TaskStorage.tasksInProcess.push([]);

		if (TaskStorage.tasksToDo[0]) {
			this.QueueNum = 0; //первая очередь становится приоритетной
			let task = TaskStorage.tasksToDo.shift();
			task.percentage = 0; // формируем свойство, показывающее степень выполненности процесса
			TaskStorage.tasksInProcess[0].push(task); //помещаем в первую очередь
		}
		console.log(
			"Задача на выполнение: ",
			TaskStorage.tasksInProcess[0][TaskStorage.tasksInProcess[0].length - 1]
		);
	};

	//понижает очередь задачи
	downGradeTaskQueue = (task, queueNum) => {
		let storage = TaskStorage.tasksInProcess;
		let nextQueue = queueNum + 1;

		if (!storage[nextQueue]) storage.push([]);

		console.log("Понижаем задачу:", task);
		storage[nextQueue].push(task);
	};

	//Задаём приоритетную очередь(ту, задачи из которой выполняем)
	setCurrentQueue(queueNum) {
		console.log("Макс очередь:", TaskStorage.MAX_QUEUE_QUANTITY);
		for (let queue = queueNum; queue < TaskStorage.MAX_QUEUE_QUANTITY; queue++) {
			if (queue === TaskStorage.MAX_QUEUE_QUANTITY - 2) {
				console.log("Обнулило");
				TaskStorage.MAX_TIME = 0;
			}
			//проверка на наличие очередей
			if (TaskStorage.tasksInProcess[queue]) {
				//проверка на наличие элемента в очереди
				if (TaskStorage.tasksInProcess[queue][0]) {
					TaskStorage.setMaxTime(0);
					queueNum = queue;
					this.QueueNum = queue;
					return queueNum;
				}
			} else return 0;
		}
	}

	taskProcessing = (queueNum) => {
		//проверяем, остались ли в текущей очереди элементы
		if (!TaskStorage.tasksInProcess[queueNum][0]) {
			queueNum = this.setCurrentQueue(queueNum);
			if (!queueNum) {
				//#todo: баг иногда после выполнения последней задачи она не пушится в completedTasks
				console.log("Очереди закончились :(");
				TaskStorage.tasksInProcess = [];
				this.QueueNum = 0;
				console.log("Обнулило");
				TaskStorage.MAX_TIME = 0;
				return;
			}
		}

		let task = TaskStorage.tasksInProcess[queueNum].shift();
		console.log("Номер очереди:", queueNum);
		console.log("Задача обрабатываемая: ", task);
		let oneTimeFraction = TaskStorage.quantum / task.time;
		task.percentage = parseFloat((task.percentage + oneTimeFraction * 100).toFixed(3));
		if (100 - task.percentage > 0.001) {
			this.downGradeTaskQueue(task, queueNum);
		} else {
			task.percentage = 100;
			TaskStorage.completedTasks.push(task);
		}
	};

	//Выполнить одну итерацию(пошаговое выполнение) обработки задач
	execute = () => {
		this.getOneNewTask();
		this.taskProcessing(this.QueueNum);
		TaskStorage.makeChange();
	};
}

export default new TaskScheduler();
