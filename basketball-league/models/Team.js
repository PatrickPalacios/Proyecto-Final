import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  playerNumber: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  curp: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true, trim: true },
  bloodType: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  playerCount: {
    type: Number,
    required: true,
    min: [1, "Debe haber al menos un jugador."],
    max: [12, "Máximo 12 jugadores permitidos."],
  },
  players: {
    type: [playerSchema],
    validate: {
      validator: function (val) {
        return val.length === this.playerCount; // Validación más clara y precisa
      },
      message: "El número de jugadores no coincide con el playerCount.",
    },
  },
});

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;
