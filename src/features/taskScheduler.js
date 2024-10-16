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
		console.log("index", taskIndex);

		if (!TaskStorage.indexesOfTasksInProcess[0])
			TaskStorage.indexesOfTasksInProcess.push([]);

		TaskStorage.indexesOfTasksInProcess[0].push(taskIndex); //помещаем индекс в первую очередь
	};

	//понижает очередь индекса задачи
	downGradeIndexQueue = (index, queueNum) => {
		const storage = TaskStorage.indexesOfTasksInProcess;
		const nextQueue = queueNum + 1;
		//добавляет очередь, если закончились
		if (!storage[nextQueue]) storage.push([]);

		storage[nextQueue].push(index);
	};

	//Задаём приоритетную очередь
	setCurrentQueue(queueNum) {
		for (let queue = queueNum; queue < TaskStorage.MAX_QUEUE_QUANTITY; queue++) {
			if (queue === TaskStorage.MAX_QUEUE_QUANTITY - 2) {
				TaskStorage.resetMaxTime();
			}
			//проверка на наличие очередей
			if (TaskStorage.indexesOfTasksInProcess[queue]) {
				//проверка на наличие элемента в очереди
				if (TaskStorage.indexesOfTasksInProcess[queue][0] !== undefined) {
					this.QueueNum = queue;
					return queue;
				}
			} else return null;
		}
	}

	//выполнение одной задачи на величину кванта
	taskProcessing = (queueNum) => {
		//проверяем, остались ли в текущей очереди элементы
		if (TaskStorage.indexesOfTasksInProcess[queueNum]?.[0] === undefined) {
			queueNum = this.setCurrentQueue(queueNum);
			//действия после прохождения всех очередей
			if (queueNum === null) {
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
		if (100 - task.percentage > 0.01) {
			this.downGradeIndexQueue(index, queueNum);
		} else {
			task.percentage = 100;
			TaskStorage.completedTasks.push(task);
			TaskStorage.removeTaskFromProcess(index);
		}
	};

	//Выполнить одну итерацию(пошаговое выполнение) обработки задач
	execute = () => {
		if (
			!TaskStorage.tasksInProcess.some((el) => el !== undefined) &&
			TaskStorage.tasksToDo.length === 0
		)
			return;

		this.getOneNewTask();
		this.taskProcessing(this.QueueNum);
	};

	//Выполнить все доступные задачи
	autoComplete = () => {
		let timerId = setInterval(() => {
			this.execute();
			if (
				!TaskStorage.tasksInProcess.some((el) => el !== undefined) &&
				TaskStorage.tasksToDo.length === 0
			)
				clearInterval(timerId);
		}, 150);
	};
}

export default new TaskScheduler();
