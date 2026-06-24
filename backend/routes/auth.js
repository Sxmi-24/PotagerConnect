const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/db");

const router = express.Router();

/*
=================================
REGISTER
=================================
*/

router.post("/register", async (req, res) => {

  const { nom, email, password } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json({
      message: "Tous les champs sont obligatoires"
    });
  }

  try {

    const checkUserSql =
      "SELECT * FROM users WHERE email = ?";

    db.query(
      checkUserSql,
      [email],
      async (err, results) => {

        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Erreur base de données"
          });
        }

        if (results.length > 0) {
          return res.status(409).json({
            message: "Cet email existe déjà"
          });
        }

        const hash = await bcrypt.hash(password, 10);

        const insertSql = `
          INSERT INTO users (nom, email, password)
          VALUES (?, ?, ?)
        `;

        db.query(
          insertSql,
          [nom, email, hash],
          (err, result) => {

            if (err) {
              console.error(err);
              return res.status(500).json({
                message: "Erreur lors de la création du compte"
              });
            }

            res.status(201).json({
              message: "Utilisateur créé avec succès"
            });

          }
        );

      }
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur serveur"
    });

  }

});

/*
=================================
LOGIN
=================================
*/

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email et mot de passe requis"
    });
  }

  const sql = `
    SELECT * FROM users
    WHERE email = ?
  `;

  db.query(
    sql,
    [email],
    async (err, results) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Erreur base de données"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Utilisateur introuvable"
        });
      }

      const user = results[0];

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!validPassword) {
        return res.status(401).json({
          message: "Mot de passe incorrect"
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      res.json({
        message: "Connexion réussie",
        token
      });

    }
  );

});

/*
=================================
PROFILE
=================================
*/

router.get("/profile", (req, res) => {

  res.json({
    message: "Route profile à sécuriser avec JWT"
  });

});

module.exports = router;