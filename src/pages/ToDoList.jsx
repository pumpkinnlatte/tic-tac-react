import React, { useState } from "react";

function List({ tareasArray, toggleTarea }) {
  return (
    <div className="List">
      {tareasArray.map((tarea, index) => (
        <Task key={index} i={index} task={tarea.text} done={tarea.done} toggleTarea={toggleTarea} />
      ))}
    </div>
  );
}

function Task({ i, task, done, toggleTarea }) {
  return (
    <div className={done ? "tarea-realizada" : "tarea-no-realizada"}>
      <input type="checkbox" id={i} checked={done} onChange={() => toggleTarea(i)} />
      <span>{task}</span>
    </div>
  );
}

function ToDoList() {
  // Estado para manejar la lista de tareas
  const [tareasArray, setTareasArray] = useState([]);
  const [nombreTarea, setNombreTarea] = useState("");

  function nuevaTarea() {
    if (nombreTarea.trim() !== "") {
      setTareasArray([...tareasArray, { text: nombreTarea, done: false }]);
      setNombreTarea(""); // Limpiar input después de agregar
    }
  }

  function toggleTarea(index) {
    const nuevasTareas = tareasArray.map((tarea, i) =>
      i === index ? { ...tarea, done: !tarea.done } : tarea
    );
    setTareasArray(nuevasTareas);
  }

  return (
    <div className="App">
      <List tareasArray={tareasArray} toggleTarea={toggleTarea} />
      <div className="Input">
        <input
          type="text"
          placeholder="¿Qué tienes planeado?"
          value={nombreTarea}
          onChange={(e) => setNombreTarea(e.target.value)}
        />
        <button onClick={nuevaTarea}>Agregar Tarea</button>
      </div>
    </div>
  );
}

export default ToDoList;
