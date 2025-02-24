import React, { useState, useEffect } from "react";

function List({ tareasArray, cambiarEstado, eliminarTarea }) {
  return (
    <div className="List">
      {tareasArray.map((tarea, index) => (
        <Task
          key={index}
          i={index}
          texto={tarea.texto}
          realizado={tarea.realizado}
          cambiarEstado={cambiarEstado}
          eliminarTarea={eliminarTarea}
        />
      ))}
    </div>
  );
}

function Task({ i, texto, realizado, cambiarEstado, eliminarTarea }) {
  return (
    <div className={realizado ? "tarea-realizada" : "tarea-no-realizada"}>
        <div className="izq">
            <input
                type="checkbox"
                id={i}
                checked={realizado}
                onChange={() => cambiarEstado(i)}
            />
        <span>{texto}</span>
        </div>
        <div className="der">
            <button className="btn-eliminar" onClick={() => eliminarTarea(i)}>
                Eliminar
            </button>
        </div>
    </div>
  );
}

function ToDoList() {
  // Cargar tareas desde el localStorage
  const inicializarTareas = () => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : []; // Si no existen tareas guardadas, inicio un array vacío
  };

  // Estado para manejar la lista de tareas
  const [tareasArray, setTareasArray] = useState(inicializarTareas); // Recibo las tareas guardadas
  const [nombreTarea, setNombreTarea] = useState("");

  // Guardar tareas en el localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareasArray));
  }, [tareasArray]);

  function nuevaTarea() {
    if (nombreTarea !== "") {
      setTareasArray([...tareasArray, { texto: nombreTarea, realizado: false }]);
      setNombreTarea(""); // Limpiar input después de agregar
    }
  }

  function cambiarEstado(index) {
    const nuevasTareas = tareasArray.map((tarea, i) =>
      i === index ? { ...tarea, realizado: !tarea.realizado } : tarea
    );
    setTareasArray(nuevasTareas);
  }

  function eliminarTarea(index) {
    const nuevasTareas = tareasArray.filter((tarea, i) => i !== index); // Filtramos las tareas, excluyendo la que coincide con el índice
    setTareasArray(nuevasTareas);
  }

  return (
    <div className="App">
      <List
        tareasArray={tareasArray}
        cambiarEstado={cambiarEstado}
        eliminarTarea={eliminarTarea}
      />
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