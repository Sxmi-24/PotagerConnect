import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div>

      <h1>Dashboard</h1>

      <Link to="/parcelles">
        Voir les parcelles
      </Link>

    </div>
  );

}

export default Dashboard;