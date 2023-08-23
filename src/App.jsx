import { useState, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { FaCheck, FaEdit } from 'react-icons/fa';

import './App.scss';

function App() {
  const [todo, setTodo] = useState([]);
  const [taskvalue, setTaskValue] = useState('');
  const [filterTask, setFilterTask] = useState('all');
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTask, setSearchTask] = useState('');

  useEffect(() => {
    const dataBase = JSON.parse(localStorage.getItem('todo')) || [];

    setTodo(dataBase);
  }, []);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);

  const saveTodo = (task) => {
    const newTodo = {
      text: task,
      done: false,
    };
    setTodo([...todo, newTodo]);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!taskvalue) {
      return;
    }
    saveTodo(taskvalue);

    if (editMode) {
      const updatedTodo = [...todo];
      updatedTodo[editTask].text = taskvalue;
      setTodo(updatedTodo);
      setEditMode(false);
      setEditTask(null);
    } else {
      saveTodo(taskvalue);
    }
    setTaskValue('');
  };

  const handleEditTask = (index) => {
    setTaskValue(todo[index].text);
    setEditMode(true);
    setEditTask(index);
  };

  const handleFilterChange = (e) => {
    setFilterTask(e.target.value);
  };

  const filterTodo = () => {
    switch (filterTask) {
      case 'all':
        return todo;
      case 'done':
        return todo.filter((task) => task.done);
      case 'pending':
        return todo.filter((task) => !task.done);
      default:
        return todo;
    }
  };

  const handleTaskDone = (index) => {
    const updatedTask = [...todo];
    updatedTask[index].done = !updatedTask[index].done;
    console.log(updatedTask);
    setTodo(updatedTask);
  };

  const handleRemoveTask = (index) => {
    const updatedTask = [...todo];
    updatedTask.splice(index, 1);
    setTodo(updatedTask);
  };

  return (
    <div className="container-todo">
      <header>
        <h1>Lista de tarefas.</h1>
      </header>
      {!editMode && (
        <form onSubmit={handleAddTask}>
          <h4>Adicione a sua tarefa</h4>
          <div className="taskAdd">
            <input
              type="text"
              placeholder="Digite sua tarefa"
              onChange={(e) => setTaskValue(e.target.value)}
              value={taskvalue}
            />
            <button>
              <IoIosAdd />
            </button>
          </div>
        </form>
      )}
      <div className="toolbar ">
        <div className="search">
          <form onSubmit={(e) => e.preventDefault()}>
            <h4>Pesquisar</h4>
            <input
              type="text"
              placeholder="Buscar Tarefa"
              onChange={(e) => setSearchTask(e.target.value)}
              value={searchTask}
            />
          </form>
        </div>
        <div className="filter">
          <h4>Filtrar</h4>
          <select name="filter" onChange={handleFilterChange}>
            <option value="all">Todos</option>
            <option value="done">Feitos</option>
            <option value="pending">A fazer</option>
          </select>
        </div>
      </div>

      {editMode && (
        <div className="edit-container">
          <h4>Editando tarefa...</h4>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              id="edit-task"
              value={taskvalue}
              onChange={(e) => setTaskValue(e.target.value)}
            />
            <button type="submit">
              <FaCheck />
            </button>
            <button>
              <MdOutlineCancel onClick={() => setEditMode(false)} />
            </button>
          </form>
        </div>
      )}
      {!editMode && (
        <div className="todo-container ">
          {filterTodo()
            .filter((todo) =>
              todo.text.toLowerCase().includes(searchTask.toLowerCase()),
            )
            .map((task, index) => (
              <div className={`task${task.done ? 'done' : ''}`} key={index}>
                <h4>{task.text}</h4>
                <button
                  className="finish-todo"
                  onClick={() => handleTaskDone(index)}
                >
                  <FaCheck />
                </button>
                <button
                  className="edit-todo"
                  onClick={() => handleEditTask(index)}
                >
                  <FaEdit />
                </button>
                <button
                  className="remove-todo"
                  onClick={() => handleRemoveTask(index)}
                >
                  <MdOutlineCancel />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
