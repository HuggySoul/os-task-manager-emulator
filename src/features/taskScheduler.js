import TaskStorage from "../store/taskStorage";

class TaskScheduler {
	QueueNum = 0; // номер приоритетной очереди(та, задачи из которой выполняем)

	//переводим задачу в статус выполняемой
	getOneNewTask = () => {
		if (!TaskStorage.tasksToDo[0]) return;

		this.QueueNum = 0; //первая очередь становится приоритетной

		let task = TaskStorage.tasksToDo.shift();
		task.percentage = 0; // формируем свойство, показывающее степень выполненности процесса
		const taskIndex = TaskStorage.tasksInProcess.push(task) - 1;
		console.log("task in getOneTask ", task);

		if (!TaskStorage.indexesOfTasksInProcess[0])
			TaskStorage.indexesOfTasksInProcess.push([]);

		TaskStorage.indexesOfTasksInProcess[0].push(taskIndex); //помещаем индекс в первую очередь
	};

	//понижает очередь задачи
	downGradeTaskQueue = (task, queueNum) => {
		const storage = TaskStorage.indexesOfTasksInProcess;
		const nextQueue = queueNum + 1;
		//добавляет очередь, если закончились
		if (!storage[nextQueue]) storage.push([]);

		storage[nextQueue].push(task);
	};

	//Задаём приоритетную очередь
	setCurrentQueue(queueNum) {
		for (let queue = queueNum; queue < TaskStorage.MAX_QUEUE_QUANTITY; queue++) {
			//обнуляем максимальное время, чтобы избежать ошибок при работе без перезагрузки web-страницы
			if (queue === TaskStorage.MAX_QUEUE_QUANTITY - 2) {
				TaskStorage.resetMaxTime();
			}
			//проверка на наличие очередей
			if (TaskStorage.indexesOfTasksInProcess[queue]) {
				//проверка на наличие элемента в очереди
				if (TaskStorage.indexesOfTasksInProcess[queue][0]) {
					this.QueueNum = queue;
					return queue;
				}
			} else return null;
		}
	}

	//выполнение одной задачи на величину кванта
	taskProcessing = (queueNum) => {
		//проверяем, остались ли в текущей очереди элементы
		if (!TaskStorage.tasksInProcess[queueNum][0]) {
			// На данном этапе проблема в том, что tasksInProcess неопределённо
			console.log(TaskStorage.tasksInProcess[queueNum][0]);
			queueNum = this.setCurrentQueue(queueNum);
			//действия после прохождения всех очередей
			if (!queueNum) {
				TaskStorage.indexesOfTasksInProcess = [];
				this.QueueNum = 0;
				TaskStorage.resetMaxTime();
				return;
			}
		}
		//берём из приоритетной очереди индекс задачи
		const index = TaskStorage.indexesOfTasksInProcess[queueNum].shift();
		const task = TaskStorage.tasksInProcess[index];
		let oneTimeFraction = TaskStorage.quantum / task.time;
		task.percentage = parseFloat((task.percentage + oneTimeFraction * 100).toFixed(2));
		console.log(task);
		if (100 - task.percentage > 0.01) {
			this.downGradeTaskQueue(task, queueNum);
		} else {
			task.percentage = 100;
			TaskStorage.completedTasks.push(task);
			TaskStorage.removeTaskFromProcess(index);
		}
	};

	//Выполнить одну итерацию(пошаговое выполнение) обработки задач
	execute = () => {
		this.getOneNewTask();
		this.taskProcessing(this.QueueNum);
		TaskStorage.makeChange(); // необходимо для отслеживания изменений внутри очередей
	};

	//Выполнить все доступные задачи
	autoComplete = () => {
		let timerId = setInterval(() => {
			this.execute();
			if (!TaskStorage.tasksInProcess[0]) clearInterval(timerId);
		}, 150);
	};
}

export default new TaskScheduler();
