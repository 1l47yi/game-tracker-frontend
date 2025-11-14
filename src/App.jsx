import { Outlet } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/*  Contenido principal */}
      <main
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default App;
