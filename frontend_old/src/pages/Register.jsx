import { useState } from "react";
import axios from "axios";

function Register() {

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          nom,
          email,
          password
        }
      );

      alert("Compte créé");

    } catch (error) {

      alert("Erreur");

    }

  };

  return (
    <div>

      <h1>Inscription</h1>

      <input
        placeholder="Nom"
        onChange={(e) =>
          setNom(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={register}>
        S'inscrire
      </button>

    </div>
  );
}

export default Register;