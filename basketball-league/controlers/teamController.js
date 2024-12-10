const Team = require('../models/Team'); // Importar el modelo

// Función para crear un equipo
const createTeam = async (teamData) => {
    const newTeam = new Team(teamData);
    try {
        const savedTeam = await newTeam.save();
        console.log("Equipo guardado:", savedTeam);
        return savedTeam;
    } catch (err) {
        console.error("Error al guardar el equipo:", err);
        throw err;
    }
};

module.exports = { createTeam };
