require('dotenv').config();

// URL de conexión a MongoDB Atlas (copia de tu panel de MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Conexión con MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((err) => console.error("Error al conectar a MongoDB Atlas", err));

module.exports = mongoose;
