import { useState, useEffect } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { FaCheck, FaEdit } from 'react-icons/fa';

import './App.scss';

function App() {
  const [todo, setTodo] = useState([]);
  const [taskvalue, setTaskValue] = useState('');
  const [editTask, setEditTask] = useState('');
  const [searchTask, setSearchTask] = useState('');
  const [filterTask, setFilterTask] = useState('all');

  useEffect(() => {
    const dataBase = JSON.parse(localStorage.getItem('todo')) || [];

    setTodo(dataBase);
  }, []);

  const saveTodo = (text) => {
    const newTodo = {
      text: text,
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
    console.log(taskvalue);

    setTaskValue('');
  };
  console.log(todo);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);
  return (
    <div className="container-todo">
      <header>
        <h1>Lista de tarefas.</h1>
      </header>
      <form onSubmit={handleAddTask}>
        <h4>Adicione a sua tarefa</h4>
        <div className="taskAdd">
          <input
            type="text"
            placeholder="Digite sua tarefa"
            onChange={(e) => setTaskValue(e.target.value)}
            value={taskvalue || ''}
          />
          <button>
            <IoIosAdd />
          </button>
        </div>
      </form>
      <div className="toolbar ">
        <div className="search">
          <form>
            <h4>Pesquisar</h4>
            <input
              type="text"
              placeholder="Buscar Tarefa"
              onChange={(e) => setEditTask(e.target.value)}
            />
            <button>
              <IoIosAdd />
            </button>
          </form>
        </div>
        <div className="filter">
          <h4>Filtrar</h4>
          <select name="filter">
            <option value="all">Todos</option>
            <option value="done">Feitos</option>
            <option value=" pending">A fazer</option>
          </select>
        </div>
      </div>
      <div className="edit-container hide">
        <h4>Editando tarefa...</h4>
        <form>
          <input type="text" id="edit-task" />
          <button>
            <FaCheck />
          </button>
          <button>
            <MdOutlineCancel />
          </button>
        </form>
      </div>
      <div className="todo-list ">
        <h4>Fazendo algo..</h4>
        <button>
          <FaCheck />
        </button>
        <button>
          <FaEdit />
        </button>
        <button>
          <MdOutlineCancel />
        </button>
      </div>
      <div className="todo-list ">
        <h4>Tarefas</h4>
        <button>
          <FaCheck />
        </button>
        <button>
          <FaEdit />
        </button>
        <button>
          <MdOutlineCancel />
        </button>
      </div>
    </div>
  );
}

export default App;
