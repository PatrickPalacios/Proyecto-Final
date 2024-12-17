import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  playerNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  curp: { type: String, required: true },
  address: { type: String, required: true },
  bloodType: { type: String, required: true },
  phone: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  playerCount: { type: Number, required: true },
  players: [playerSchema],
});

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;
