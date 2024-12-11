import connectDB from "../../../utils/connectDB"; // Conexión con MongoDB
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Para crear un token de autenticación

connectDB(); // Conectar a la base de datos

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
      // Comprobar si el correo ya está registrado
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Este correo ya está registrado." });
      }

      // Crear nuevo usuario
      const newUser = new User({ firstName, lastName, email, password });

      // Guardar el usuario
      await newUser.save();

      // Crear un token JWT
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      // Enviar respuesta
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Hubo un error en el servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
