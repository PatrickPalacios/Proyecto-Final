const mongoose = require('mongoose');

// Esquema para el equipo de básquetbol
const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    championshipsWon: { type: Number, default: 0 },
}, { timestamps: true });

// Modelo
const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
