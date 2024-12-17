import connectDb from '../../utils/connectDB';
import Team from '../../models/Team';

export default async function handler(req, res) {
  await connectDb();

  if (req.method === 'POST') {
    try {
      const { name, playerCount, players } = req.body;

      // Validación básica
      if (!name || !playerCount || !players || !players.length) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      // Crear un nuevo equipo con jugadores
      const newTeam = new Team({
        name,
        playerCount,
        players: players.slice(0, playerCount), // Solo guarda hasta playerCount jugadores
      });

      // Guardar en MongoDB
      await newTeam.save();

      return res.status(201).json({ message: 'Equipo y jugadores guardados correctamente' });
    } catch (error) {
      console.error('Error al guardar el equipo:', error.message);
      return res.status(500).json({ error: 'Hubo un error al guardar el equipo' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
