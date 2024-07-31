import styles from './App.module.css';
import './global.css';

import { ClipboardText, PlusCircle } from 'phosphor-react';

import rocketLogo from './assets/rocket.svg';
import toDo from './assets/todo.svg';

import { Input } from './components/Input';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Task, TaskType } from './components/Task';

const taskList: TaskType[] = [
  {
    id: uuidv4(),
    text: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isDone: false,
  },
  {
    id: uuidv4(),
    text: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isDone: false,
  },
  {
    id: uuidv4(),
    text: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isDone: false,
  },
  {
    id: uuidv4(),
    text: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isDone: true,
  },
  {
    id: uuidv4(),
    text: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
    isDone: true,
  },
];

export function App() {
  const [tasks, setTasks] = useState(taskList);
  const [newTaskText, setNewTaskText] = useState('');

  const withoutTasks = tasks.length == 0;
  const doneTasksQuant = tasks.reduce((sum, task) => task.isDone ? sum + 1 : sum, 0);
  const tasksQuant = tasks.length;

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    const newTask = {
      id: uuidv4(),
      text: newTaskText,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity('');
    setNewTaskText(e.target.value);
  }

  function handleNewTaskInvalid(e: InvalidEvent<HTMLInputElement>) {
    e.target.setCustomValidity('Esse campo é obrigatório'); 
  }

  function deleteTask(taskToDeleteId: string) {
    const newTaskList = tasks.filter(({ id }) => id !== taskToDeleteId);

    setTasks(newTaskList);
  }

  function changeTaskStatus(taskToDeleteId: string) {
    const newTaskList = tasks.map(task => {
      task.isDone = task.id == taskToDeleteId ? !task.isDone : task.isDone;

      return task;
    });

    setTasks([...newTaskList]);
  }

  return (
    <div>
      <header className={styles.wrapper}>
        <img src={rocketLogo} alt="Foquete" />
        <img src={toDo} alt="To Do" />
      </header>

      <main className={styles.content}>
        <form onSubmit={handleCreateTask} className={styles.addTaskBar}>
          <Input 
            type="text"
            name="task"
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button 
            className={styles.createButton}
            type="submit"
          >
            Criar <PlusCircle />
          </button>
        </form>

        <section>
          <header className={styles.tasksInfos}>
            <div>
              <p>Tarefas criadas</p>
              <span>{tasksQuant}</span>
            </div>
            <div>
              <p>Concluídas</p>
              <span>{doneTasksQuant}</span>
            </div>
          </header>

          {withoutTasks ? (
            <main className={styles.emptyList}>
              <ClipboardText weight="light" />
              <div>
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </main>
          ) : (
            <main className={styles.list}>
              {tasks.map(({ id, isDone, text }) => (
                <Task
                  key={id}
                  id={id}
                  isDone={isDone}
                  text={text}
                  onDeleteTask={deleteTask}
                  onChangeTaskStatus={changeTaskStatus}
                />
              ))}
            </main>
          )}
        </section>
      </main>
    </div>
  );
}
