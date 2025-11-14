import { useState } from "react";
import api from "../services/api";

const FormularioJuego = ({ onGameAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    coverUrl: "",
    platform: "PC",
    status: "Pendiente",
    rating: 0,
    hoursPlayed: 0,
    releaseYear: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/games", formData);
      onGameAdded(res.data);
      setFormData({
        title: "",
        coverUrl: "",
        platform: "PC",
        status: "Pendiente",
        rating: 0,
        hoursPlayed: 0,
        releaseYear: "",
      });
    } catch (err) {
      setError("Error al agregar el juego");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Agregar nuevo juego
      </h3>

      {/* Contenedor horizontal flexible */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ flex: "1 1 150px", minWidth: "150px" }}
        />
        <input
          type="text"
          name="coverUrl"
          placeholder="URL de la portada (opcional)"
          value={formData.coverUrl}
          onChange={handleChange}
          style={{ flex: "1 1 200px", minWidth: "200px" }}
        />
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          style={{ flex: "1 1 120px", minWidth: "120px" }}
        >
          <option>PC</option>
          <option>PlayStation</option>
          <option>Xbox</option>
          <option>Nintendo</option>
          <option>Mobile</option>
          <option>Otro</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{ flex: "1 1 120px", minWidth: "120px" }}
        >
          <option>Pendiente</option>
          <option>Jugando</option>
          <option>Completado</option>
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Calificación (0-10)"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          style={{ flex: "1 1 100px", minWidth: "100px" }}
        />
        <input
          type="number"
          name="hoursPlayed"
          placeholder="Horas jugadas"
          value={formData.hoursPlayed}
          onChange={handleChange}
          min="0"
          style={{ flex: "1 1 100px", minWidth: "100px" }}
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Año de lanzamiento"
          value={formData.releaseYear}
          onChange={handleChange}
          style={{ flex: "1 1 120px", minWidth: "120px" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            flex: "1 1 150px",
            minWidth: "150px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.7rem",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Agregando..." : "Agregar juego"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default FormularioJuego;

