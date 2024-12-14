import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Por favor ingresa tu correo y contraseña." });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas." });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas." });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error en el servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
