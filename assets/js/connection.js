const express = require("express");
const mysql = require("mysql");
//const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Middleware
//app.use(cors());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// BD Config
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Replace user
    password: "root", // Replace password
    database: "laconsentida"
});

// BD Connection
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err);
    } else {
        console.log("Conectado a la base de datos MySQL.");
    }
});

// Root to manage the form
app.post("/reservar", (req, res) => {
   
    const { reservationDate, reservationTurno, reservationHour, reservationPersonas } = req.body;

    console.log("Headers recibidos:", req.headers);
    console.log("Body recibido:", req.body);
    const sql = "INSERT INTO reservas (fecha, turno, hora, personas) VALUES (?, ?, ?, ?)";
    const values = [reservationDate, reservationTurno, reservationHour, reservationPersonas];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al guardar la reserva:", err);
            return res.status(500).send("Error al guardar la reserva.");
        }
        console.log("Reserva guardada:", result);
        res.status(200).send("Reserva guardada con éxito.");
    });
});

// Initialize server
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});