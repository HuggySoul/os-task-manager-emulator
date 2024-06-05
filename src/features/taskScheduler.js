import TaskStorage from "../store/taskStorage";

class TaskScheduler {
	QueueNum = 0; // номер приоритетно очереди(та, задачи из которой выполняем)

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
	};

	//понижает очередь задачи
	downGradeTaskQueue = (task, queueNum) => {
		let storage = TaskStorage.tasksInProcess;
		let nextQueue = queueNum + 1;

		if (!storage[nextQueue]) storage.push([]);

		storage[nextQueue].push(task);
	};

	//Задаём приоритетную очередь
	setCurrentQueue(queueNum) {
		for (let queue = queueNum; queue < TaskStorage.MAX_QUEUE_QUANTITY; queue++) {
			//обнуляем максимальное время, чтобы избежать ошибок при работе без перезагрузки web-страницы
			if (queue === TaskStorage.MAX_QUEUE_QUANTITY - 2) {
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

	//выполнение одной задачи на величину кванта
	taskProcessing = (queueNum) => {
		//проверяем, остались ли в текущей очереди элементы
		if (!TaskStorage.tasksInProcess[queueNum][0]) {
			queueNum = this.setCurrentQueue(queueNum);
			//действия после прохождения всех очередей
			if (!queueNum) {
				TaskStorage.tasksInProcess = [];
				this.QueueNum = 0;
				TaskStorage.MAX_TIME = 0;
				return;
			}
		}

		let task = TaskStorage.tasksInProcess[queueNum].shift();
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
		TaskStorage.makeChange(); // необходимо для отслеживания изменений внутри очередей
	};

	autoComplete = () => {
		let timerId = setInterval(() => {
			this.execute();
			if (!TaskStorage.tasksInProcess[0]) clearInterval(timerId);
		}, 150);
	};
}

export default new TaskScheduler();
