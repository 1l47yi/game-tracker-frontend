import { useEffect, useState } from "react";
import api from "../services/api";

const EstadisticasPersonales = ({ visible, onClose }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!visible) return;

    const fetchGames = async () => {
      try {
        const res = await api.get("/games");
        const gamesData = res.data;

        const totalHoras = gamesData.reduce(
          (acc, g) => acc + (g.hoursPlayed || 0),
          0
        );

        const juegosConPorcentaje = gamesData.map((g) => ({
          titulo: g.title || "Sin título",
          horas: g.hoursPlayed || 0,
          porcentaje:
            totalHoras > 0
              ? ((g.hoursPlayed / totalHoras) * 100).toFixed(1)
              : 0,
        }));

        setStats({ totalHoras, juegosConPorcentaje });
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    fetchGames();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: visible ? 0 : "-400px",
        width: "350px",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        padding: "20px",
        boxShadow: "4px 0 15px rgba(0, 0, 0, 0.6)",
        transition: "left 0.4s ease-in-out",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>📊 Estadísticas Generales</h3>

      {stats ? (
        <>
          <p>
            <strong>Horas jugadas en total:</strong> {stats.totalHoras}
          </p>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {stats.juegosConPorcentaje.map((j, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px solid #333",
                  paddingBottom: "6px",
                }}
              >
                <strong>{j.titulo}</strong>: {j.horas} h ({j.porcentaje}%)
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Cargando estadísticas...</p>
      )}

      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          backgroundColor: "#e53935",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          width: "100%",
          fontWeight: "bold",
        }}
      >
        Cerrar
      </button>
    </div>
  );
};

export default EstadisticasPersonales;
