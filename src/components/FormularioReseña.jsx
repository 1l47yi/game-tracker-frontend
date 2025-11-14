import { useState } from "react";
import api from "../services/api";

const FormularioReseña = ({ gameId }) => {
  const [review, setReview] = useState({
    author: "",
    content: "",
    stars: 5,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/reviews/game/${gameId}`, review);
      setReview({ author: "", content: "", stars: 5 });
      window.location.reload(); // refresca 
    } catch (error) {
      console.error("Error al enviar reseña:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1e1e1e",
        padding: "10px",
        borderRadius: "10px",
        marginTop: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        maxWidth: "400px",
      }}
    >
      <h3>Escribir reseña</h3>
      <input
        type="text"
        name="author"
        placeholder="Tu nombre"
        value={review.author}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Escribe tu opinión..."
        value={review.content}
        onChange={handleChange}
        required
      />
      <label>
        Puntuación (1-5):
        <input
          type="number"
          name="stars"
          min="1"
          max="5"
          value={review.stars}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Publicar reseña"}
      </button>
    </form>
  );
};

export default FormularioReseña;
