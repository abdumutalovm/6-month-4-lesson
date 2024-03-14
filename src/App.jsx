import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState('')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function validation() {
    if (name === "") {
      alert("The place can not be the head!")
      return false;
    }
    return true;
  }

  function submit(e) {
    e.preventDefault()

    if (!validation()) return;

    const todo = {
      id: Date.now(),
      name: name,
      status: false,
    };

    setTodos(prevTodos => [...prevTodos, todo]);
    setName('');
  }


  function deleteTodo(id) {
    const confirmDelete = window.confirm("Do you really want to delete?");
    if (confirmDelete) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      alert("Deleted successfully")
    }
  }

  function toggleStatus(id) {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  }

  return (
    <>
      <form className='border mt-5 rounded' style={{ width: "600px" }}>
        <div className="header border p-3 bg-secondary text-white rounded-top">
          <h4>Todos ({todos.length})</h4>
        </div>

        <div className="main pt-3 ps-3 pe-3 d-flex align-items-center">
          <input
            placeholder='Enter todo here'
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className='border w-75 p-3'
            style={{
              height: "40px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              outline: "none"
            }}
          />
          <button className='w-25 text-white' onClick={submit}>Submit</button>
        </div>

        <div className='p-3'>
          {todos.map(todo => (
            <div key={todo.id} className="w-100 border rounded p-3 d-flex align-items-center justify-content-between">
              <div className='d-flex align-items-center gap-3'>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleStatus(todo.id)}
                />
                <h5 style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>{todo.name}</h5>
              </div>

              <div className='d-flex align-items-center gap-3'>
                <span><i className="fa-regular fa-pen-to-square"></i></span>
                <span onClick={() => deleteTodo(todo.id)}><i className="fa-solid fa-trash-can"></i></span>
              </div>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}

export default App;
