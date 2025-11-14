import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function DetalleJuego() {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [reseñas, setReseñas] = useState([]);
  const [autor, setAutor] = useState("");
  const [texto, setTexto] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [editando, setEditando] = useState(null); //  guarda el ID de la reseña edita
  const [editTexto, setEditTexto] = useState("");
  const [editCalificacion, setEditCalificacion] = useState("");

  // Cargar juego y reseñas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const juegoRes = await api.get(`/games/${id}`);
        setJuego(juegoRes.data);

        const reseñasRes = await api.get(`/reviews/game/${id}`);
        setReseñas(reseñasRes.data);
      } catch (error) {
        console.error("Error al cargar detalles:", error);
      }
    };
    fetchData();
  }, [id]);

  // Agregar reseña
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reviews", {
        juegoId: id,
        autor,
        texto,
        calificacion: Number(calificacion),
      });

      const reseñasRes = await api.get(`/reviews/game/${id}`);
      setReseñas(reseñasRes.data);

      setAutor("");
      setTexto("");
      setCalificacion("");
    } catch (error) {
      console.error("Error al agregar reseña:", error);
    }
  };

  // Eliminar reseña
  const handleDeleteReview = async (reviewId) => {
    if (confirm("¿Seguro que deseas eliminar esta reseña?")) {
      try {
        await api.delete(`/reviews/${reviewId}`);
        setReseñas(reseñas.filter((r) => r._id !== reviewId));
      } catch (error) {
        console.error("Error al eliminar reseña:", error);
        alert("No se pudo eliminar la reseña");
      }
    }
  };

  // Iniciar edición
  const handleEditStart = (r) => {
    setEditando(r._id);
    setEditTexto(r.texto);
    setEditCalificacion(r.calificacion);
  };

  // Guardar edición
  const handleEditSave = async (r) => {
    try {
      const res = await api.put(`/reviews/${r._id}`, {
        autor: r.autor,
        texto: editTexto,
        calificacion: Number(editCalificacion),
      });

      setReseñas(
        reseñas.map((rev) => (rev._id === r._id ? res.data : rev))
      );

      setEditando(null);
    } catch (error) {
      console.error("Error al editar reseña:", error);
      alert("No se pudo editar la reseña");
    }
  };

  // Cancelar edición
  const handleEditCancel = () => {
    setEditando(null);
  };

  if (!juego) return <p style={{ color: "#fff" }}>Cargando...</p>;

  return (
    <div
      style={{
        padding: "2rem",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center" }}>{juego.titulo}</h2>
        <p>🎮 Plataforma: {juego.plataforma}</p>
        <p>⭐ Rating: {juego.rating}</p>

        {/* Reseñas */}
        <h3 style={{ marginTop: "20px" }}>Reseñas</h3>
        {reseñas.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          reseñas.map((r) => (
            <div
              key={r._id}
              style={{
                backgroundColor: "#2c2c2c",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <strong>{r.autor || "Anónimo"}</strong>

              {editando === r._id ? (
                <>
                  <textarea
                    value={editTexto}
                    onChange={(e) => setEditTexto(e.target.value)}
                    style={{ width: "100%", marginTop: "5px" }}
                  />
                  <input
                    type="number"
                    value={editCalificacion}
                    onChange={(e) => setEditCalificacion(e.target.value)}
                    min="1"
                    max="5"
                    style={{ width: "100%", marginTop: "5px" }}
                  />
                  <div style={{ marginTop: "5px" }}>
                    <button
                      onClick={() => handleEditSave(r)}
                      style={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        border: "none",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleEditCancel}
                      style={{
                        backgroundColor: "#757575",
                        color: "white",
                        border: "none",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>{r.texto}</p>
                  <small>{r.calificacion} ⭐</small>
                  <br />
                  <button
                    onClick={() => handleEditStart(r)}
                    style={{
                      marginTop: "8px",
                      backgroundColor: "#2196f3",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteReview(r._id)}
                    style={{
                      backgroundColor: "#e53935",
                      color: "white",
                      border: "none",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          ))
        )}

        {/* Agregar reseña */}
        <h3>Agregar reseña</h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <input
            placeholder="Tu nombre"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
          <textarea
            placeholder="Escribe tu reseña"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Calificación (1–5)"
            min="1"
            max="5"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            required
          />
          <button type="submit">Enviar reseña</button>
        </form>
      </div>
    </div>
  );
}

export default DetalleJuego;
