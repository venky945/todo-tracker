import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import ToDos from "./components/ToDos";
import Footer from "./components/Footer";
import About from "./components/About";
import {useState, useReducer, useEffect} from 'react';
import AddTodo from './components/AddTodo';

const ACTIONS = {
  SET_TODO: 'set_todo',
  ADD_TODO: 'add_todo',
  DELETE_TODO: 'delete_todo',
  TOGGLE_REM: 'toggle_rem'
};

const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_TODO: {
      state.todos = action.payload.todosFromServer;
      return {todos: state.todos};
    }
    case ACTIONS.ADD_TODO: {
      return {todos: [...state.todos, action.payload.data]};
    }
    case ACTIONS.DELETE_TODO: {
      return {todos: state.todos.filter((todo)=> todo.id !== action.payload.id)};
    }
    case ACTIONS.TOGGLE_REM: {
      return {todos: state.todos.map((todo)=> todo.id === action.payload.id ? {...todo, reminder: action.payload.data.reminder} : todo)};
    }
    default: return state
  }
};

const App = () => {
  const [showAddTodo, setShowAddTodo] = useState(true);
  const [state, dispatch] = useReducer(reducer, {todos:[]});

  useEffect(()=>{
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      dispatch({type: ACTIONS.SET_TODO, payload: {todosFromServer}});
    }
    getTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/todos');
    const data = res.json();
    return data;
  };

  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`);
    const data = res.json();
    return data;
  };

  const toggleReminder = async(id) => {
    const todoToToggle = await fetchTodo(id);
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({...todoToToggle, reminder: !todoToToggle.reminder})
    });
    const data = await res.json();
    dispatch({type: ACTIONS.TOGGLE_REM, payload: {id, data}});
  };

  const addTodo = async (todo) => {
    const res = await fetch(`http://localhost:5000/todos/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const data = await res.json();
    dispatch({type: ACTIONS.ADD_TODO, payload: {data}});
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    });
    dispatch({type: ACTIONS.DELETE_TODO, payload: {id}});
  };

  return (
    <Router>
      <div className="container">
        <Header onAdd={()=> setShowAddTodo(!showAddTodo)} showAddTodo={showAddTodo} title={"Venky"} />
        <Routes>
          <Route path='/' element = {
            <>
              {showAddTodo && <AddTodo onAddTodo={addTodo} />}
              {
                state.todos.length ?
                (<ToDos todos={state.todos} onDelete={deleteTodo} onToggleRem={toggleReminder}/>)
                : (<h3>No Tasks AnyMore</h3>)
              }
            </>
          } />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;