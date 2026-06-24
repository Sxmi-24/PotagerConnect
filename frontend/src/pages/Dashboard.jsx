import { Link } from "react-router-dom";

function Dashboard() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Dashboard PotagerConnect</h1>

      <p>
        Bienvenue sur votre espace de gestion.
      </p>

      <br />

      <Link to="/parcelles">
        🌱 Gérer les parcelles
      </Link>

      <br /><br />

      <button onClick={logout}>
        Déconnexion
      </button>

    </div>

  );

}

export default Dashboard;