import { useState, useEffect } from "react";
import api from "../services/api";
import FormularioJuego from "./FormularioJuego";
import TarjetaJuego from "./TarjetaJuego";
import EstadisticasPersonales from "./EstadisticasPersonales";

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

  // argar juegos desde backend al iniciar
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await api.get("/games");
        console.log("🎮 Juegos cargados:", res.data);
        setJuegos(res.data);
      } catch (error) {
        console.error("Error al cargar juegos:", error);
      }
    };

    fetchGames();
  }, []);

  // Agregar nuevo juego
  const handleGameAdded = (nuevoJuego) => {
    setJuegos((prev) => [...prev, nuevoJuego]);
  };

  //Eliminar juego 
  const handleDelete = (id) => {
    setJuegos((prev) => prev.filter((juego) => juego._id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      {/* Sección lateral izq */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          backgroundColor: "#1e1e1e",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2>📚 Biblioteca de juegos</h2>
        <button
          onClick={() => setMostrarEstadisticas(true)}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Ver estadísticas
        </button>
      </div>

      {/*Caja agregar juego */}
      <div
        style={{
          marginTop: "40px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormularioJuego onGameAdded={handleGameAdded} />
      </div>

      {/* Tarjetas juegos */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <TarjetaJuego key={juego._id} juego={juego} onDelete={handleDelete} />
          ))
        ) : (
          <p style={{ color: "#ccc" }}>No hay juegos registrados aún.</p>
        )}
      </div>

      {/* Panel lateral estadísticas */}
      <EstadisticasPersonales
        visible={mostrarEstadisticas}
        onClose={() => setMostrarEstadisticas(false)}
      />
    </div>
  );
};

export default BibliotecaJuegos;
