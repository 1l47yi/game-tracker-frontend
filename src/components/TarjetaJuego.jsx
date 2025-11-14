import api from "../services/api";
import { Link } from "react-router-dom";

const TarjetaJuego = ({ juego, onDelete }) => {
  const handleDelete = async () => {
    const confirmar = confirm(`¿Seguro que deseas eliminar "${juego.title}"?`);
    if (!confirmar) return;

    try {
      await api.delete(`/games/${juego._id}`);
      if (onDelete) onDelete(juego._id);
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
      alert("❌ No se pudo eliminar el juego.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#fff",
        borderRadius: "10px",
        padding: "15px",
        width: "250px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}
    >
      <Link
        to={`/juego/${juego._id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <img
          src={juego.coverUrl || "https://via.placeholder.com/250x150?text=Sin+imagen"}
          alt={juego.title || "Sin título"}
          style={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <h3>{juego.title || "Sin título"}</h3>
        <p>🎮 {juego.platform || "Sin plataforma"}</p>
        <p>⭐ {juego.rating || 0}</p>
        <p>🕓 {juego.hoursPlayed || 0} horas</p>
      </Link>

      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "#e53935",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Eliminar
      </button>
    </div>
  );
};

export default TarjetaJuego;

