require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db");

const authRoutes = require("./routes/auth");
const parcelleRoutes = require("./routes/parcelles");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/parcelles", parcelleRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Serveur lancé");
});