import BibliotecaJuegos from "../components/BibliotecaJuegos";

function Home() {
  return (
    <div
      style={{
        backgroundColor: "#0d0d0d",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", //  dejar título arriba
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      {/* Título */}
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.6rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        🎮 V1:GT
      </h1>
      {/* Contenedor central */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // centra horizontalmente
          alignItems: "center", // centra verticalmente
          width: "100%",
          flexGrow: 1, // ocupa el espacio restante
        }}
      >
        <BibliotecaJuegos />
      </div>
    </div>
  );
}

export default Home;
