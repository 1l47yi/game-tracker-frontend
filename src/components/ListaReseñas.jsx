import { useEffect, useState } from "react";
import api from "../services/api";

const ListaReseñas = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/game/${gameId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [gameId]);

  if (reviews.length === 0) return <p>Sin reseñas todavía.</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Reseñas</h3>
      {reviews.map((r) => (
        <div
          key={r._id}
          style={{
            backgroundColor: "#1e1e1e",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <strong>{r.author}</strong> — ⭐ {r.stars}
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaReseñas;
