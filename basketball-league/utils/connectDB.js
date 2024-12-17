import mongoose from "mongoose";

let isConnected = false; // Variable para rastrear el estado de conexión

const connectDB = async () => {
  if (isConnected) {
    console.log("Usando conexión existente a MongoDB.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); // Salir si la conexión falla
  }
};

export default connectDB;
