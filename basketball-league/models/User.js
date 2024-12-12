import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Para encriptar las contraseñas

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    match: [/.+\@.+\..+/, "Por favor, ingresa un correo electrónico válido"],
    lowercase: true, // Normaliza el correo a minúsculas
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
}, {
  timestamps: true, // Agrega las marcas de tiempo de creación y actualización
});

// Encriptar la contraseña antes de guardar el usuario
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12); // Genera un salt para mayor seguridad
    this.password = await bcrypt.hash(this.password, salt); // Encripta la contraseña
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar la contraseña en el login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Asegura un único modelo en ejecución
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
