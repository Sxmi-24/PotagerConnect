import { useEffect, useState } from "react";
import axios from "axios";

function Parcelles() {

  const [parcelles, setParcelles] = useState([]);

  const chargerParcelles = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/parcelles",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setParcelles(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    chargerParcelles();

  }, []);

  return (
    <div>

      <h1>Liste des parcelles</h1>

      {parcelles.map((parcelle) => (

        <div
          key={parcelle.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>{parcelle.nom}</h3>

          <p>
            Surface : {parcelle.surface}
          </p>

          <p>
            Statut : {parcelle.statut}
          </p>

        </div>

      ))}

    </div>
  );

}

export default Parcelles;