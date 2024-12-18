import connectDb from '../../utils/connectDB';
import Team from '../../models/Team';

export default async function handler(req, res) {
  await connectDb();

  if (req.method === 'POST') {
    try {
      const { name, playerCount, players } = req.body;

      if (!name || !playerCount || !players || players.length === 0) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      // Verificar si ya existe un equipo con el mismo nombre
      const existingTeam = await Team.findOne({ name });
      if (existingTeam) {
        return res.status(400).json({ error: 'El equipo ya existe.' });
      }

      // Verificar que el número de jugadores sea igual a playerCount
      if (players.length !== Number(playerCount)) {
        return res.status(400).json({
          error: `La cantidad de jugadores (${players.length}) no coincide con el número especificado (${playerCount}).`,
        });
      }

      // Validar que todos los jugadores tengan los campos obligatorios
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (!player.playerNumber || !player.firstName || !player.lastName || !player.curp || !player.address || !player.bloodType || !player.phone) {
          return res.status(400).json({ error: `El jugador ${i + 1} tiene campos incompletos.` });
        }
      }

      // Crear y guardar el equipo
      const newTeam = new Team({
        name,
        playerCount,
        players,
      });

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
