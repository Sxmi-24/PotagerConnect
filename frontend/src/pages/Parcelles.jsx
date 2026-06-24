import { useEffect, useState } from "react";
import axios from "axios";

function Parcelles() {

  const [parcelles, setParcelles] = useState([]);

  const [nom, setNom] = useState("");
  const [surface, setSurface] = useState("");
  const [statut, setStatut] = useState("");
  const [datePlantation, setDatePlantation] =
    useState("");

  const chargerParcelles = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/parcelles",
        {
          headers: {
            Authorization: `Bearer ${token}`
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

  const ajouterParcelle = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/parcelles",
        {
          nom,
          surface,
          statut,
          date_plantation: datePlantation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Parcelle ajoutée avec succès");

      setNom("");
      setSurface("");
      setStatut("");
      setDatePlantation("");

      chargerParcelles();

    } catch (error) {

      console.error(error);

      alert("Erreur lors de l'ajout");

    }

  };

  const supprimerParcelle = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/parcelles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Parcelle supprimée");

      chargerParcelles();

    } catch (error) {

      console.error(error);

      alert("Erreur lors de la suppression");

    }

  };

  return (

    <div className="container mt-4">

      <h1 className="mb-4">
        🌱 Gestion des parcelles
      </h1>

      <div className="card p-4 mb-4">

        <h3>Ajouter une parcelle</h3>

        <input
          className="form-control mb-3"
          value={nom}
          placeholder="Nom de la parcelle"
          onChange={(e) => setNom(e.target.value)}
        />

        <input
          className="form-control mb-3"
          value={surface}
          placeholder="Surface"
          onChange={(e) => setSurface(e.target.value)}
        />

        <input
          className="form-control mb-3"
          value={statut}
          placeholder="Statut"
          onChange={(e) => setStatut(e.target.value)}
        />

        <label className="mb-2">
          Date de plantation
        </label>

        <input
          className="form-control mb-3"
          type="date"
          value={datePlantation}
          onChange={(e) =>
            setDatePlantation(e.target.value)
          }
        />

        <button
          className="btn btn-success"
          onClick={ajouterParcelle}
        >
          Ajouter
        </button>

      </div>

      <h2 className="mb-3">
        Liste des parcelles
      </h2>

      {parcelles.map((p) => (

        <div
          className="card p-3 mb-3"
          key={p.id}
        >

          <h4>{p.nom}</h4>

          <p>
            <strong>Surface :</strong> {p.surface}
          </p>

          <p>
            <strong>Statut :</strong> {p.statut}
          </p>

          <p>
            <strong>Date :</strong>{" "}
            {p.date_plantation
              ? p.date_plantation.substring(0, 10)
              : "Non renseignée"}
          </p>

          <button
            className="btn btn-danger"
            onClick={() =>
              supprimerParcelle(p.id)
            }
          >
            Supprimer
          </button>

        </div>

      ))}

    </div>

  );

}

export default Parcelles;