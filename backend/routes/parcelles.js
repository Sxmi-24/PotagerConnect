const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/auth");

const router = express.Router();

/*
GET ALL PARCELLES
*/

router.get("/", auth, (req, res) => {

  const sql = "SELECT * FROM parcelles";

  db.query(sql, (err, results) => {

    if (err) {
      return res.status(500).json({
        message: "Erreur base de données"
      });
    }

    res.json(results);

  });

});

/*
GET PARCELLE BY ID
*/

router.get("/:id", auth, (req, res) => {

  const sql =
    "SELECT * FROM parcelles WHERE id = ?";

  db.query(
    sql,
    [req.params.id],
    (err, results) => {

      if (err) {
        return res.status(500).json({
          message: "Erreur base de données"
        });
      }

      res.json(results);

    }
  );

});

/*
CREATE PARCELLE
*/

router.post("/", auth, (req, res) => {

  const {
    nom,
    surface,
    statut
  } = req.body;

  const sql = `
  INSERT INTO parcelles
  (nom, surface, statut)
  VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [nom, surface, statut],
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Erreur insertion"
        });
      }

      res.json({
        message: "Parcelle créée"
      });

    }
  );

});

/*
UPDATE PARCELLE
*/

router.put("/:id", auth, (req, res) => {

  const {
    nom,
    surface,
    statut
  } = req.body;

  const sql = `
  UPDATE parcelles
  SET nom=?, surface=?, statut=?
  WHERE id=?
  `;

  db.query(
    sql,
    [
      nom,
      surface,
      statut,
      req.params.id
    ],
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Erreur modification"
        });
      }

      res.json({
        message: "Parcelle modifiée"
      });

    }
  );

});

/*
DELETE PARCELLE
*/

router.delete("/:id", auth, (req, res) => {

  const sql =
    "DELETE FROM parcelles WHERE id=?";

  db.query(
    sql,
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Erreur suppression"
        });
      }

      res.json({
        message: "Parcelle supprimée"
      });

    }
  );

});

module.exports = router;