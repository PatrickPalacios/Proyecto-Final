import bcrypt from 'bcryptjs';
import connectDB from '../../utils/connectDB';
import User from '../../models/User';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Por favor complete todos los campos.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
    }

    await connectDB();

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
      }

      const user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      await user.save();

      return res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Hubo un error al registrar el usuario.' });
    }
  } else {
    return res.status(405).json({ message: 'Método no permitido.' });
  }
};

export default handler;
