import { useState, useEffect } from "react";
import api from "../services/api";

const ReseñasJuego = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);

  // Obtener reseñas del juego
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/game/${gameId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  // Eliminar reseña
  const handleDeleteReview = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta reseña?")) {
      try {
        await api.delete(`/reviews/${id}`);
        setReviews(reviews.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Error al eliminar reseña:", error);
        alert("No se pudo eliminar la reseña");
      }
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
        backgroundColor: "#1e1e1e",
        padding: "15px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Reseñas</h3>

      {reviews.length === 0 ? (
        <p>No hay reseñas todavía.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            style={{
              backgroundColor: "#2c2c2c",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <p>{review.texto}</p>
            <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
               {review.autor || "Anónimo"} —  {review.calificacion}
            </p>
            <button
              onClick={() => handleDeleteReview(review._id)}
              style={{
                backgroundColor: "#e53935",
                color: "white",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Eliminar reseña
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReseñasJuego;
