import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Este correo ya está registrado." });
      }

      const newUser = new User({ firstName, lastName, email, password });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error en el servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
