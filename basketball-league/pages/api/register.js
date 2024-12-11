// pages/api/register.js
import bcrypt from 'bcryptjs';
import connectDB from '../../utils/connectDB';
import User from '../../models/User'; // Asegúrate de tener el modelo User

// Conexión a la base de datos y creación del usuario
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Verificar que todos los campos sean enviados
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Por favor complete todos los campos.' });
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
    }

    // Conectar a la base de datos
    await connectDB();

    try {
      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
      }

      // Crear un nuevo usuario
      const hashedPassword = await bcrypt.hash(password, 12); // Hashear la contraseña
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Guardar el nuevo usuario en la base de datos
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
