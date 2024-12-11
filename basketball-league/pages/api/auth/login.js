import connectDB from "../../../utils/connectDB"; // Conexión con MongoDB
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Para crear un token de autenticación

connectDB(); // Conectar a la base de datos

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ message: "Correo y contraseña son obligatorios." });
    }

    try {
      // Comprobar si el usuario existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Correo o contraseña incorrectos." });
      }

      // Verificar la contraseña
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Correo o contraseña incorrectos." });
      }

      // Crear un token JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      // Enviar respuesta
      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Hubo un error en el servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
