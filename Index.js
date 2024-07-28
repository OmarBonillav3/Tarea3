const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const TASKS_FILE = 'tasks.json';

let tasks = [];

const loadTasks = () => {
    if (fs.existsSync(TASKS_FILE)) {
        const data = fs.readFileSync(TASKS_FILE);
        tasks = JSON.parse(data);
    }
};

const saveTasks = () => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

const addTask = (task) => {
    tasks.push({ description: task, completed: false });
    saveTasks();
    console.log('Tarea agregada.');
    mainMenu();
};

const listTasks = () => {
    console.log('\nLista de tareas:');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. [${task.completed ? 'x' : ' '}] ${task.description}`);
    });
    mainMenu();
};

const completeTask = (index) => {
    if (tasks[index - 1]) {
        tasks[index - 1].completed = true;
        saveTasks();
        console.log('Tarea completada.');
    } else {
        console.log('Índice de tarea no válido.');
    }
    mainMenu();
};

const mainMenu = () => {
    console.log('\nGestor de Tareas');
    console.log('1. Agregar Tarea');
    console.log('2. Listar Tareas');
    console.log('3. Completar Tarea');
    console.log('4. Salir');
    rl.question('Elige una opción: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Descripción de la tarea: ', addTask);
                break;
            case '2':
                listTasks();
                break;
            case '3':
                rl.question('Número de la tarea a completar: ', (index) => completeTask(parseInt(index)));
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                mainMenu();
        }
    });
};

loadTasks();
mainMenu();
