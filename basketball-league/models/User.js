import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
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
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      validate: {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
        },
        message:
          "La contraseña debe contener al menos una mayúscula, una minúscula y un número.",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    this.firstName =
      this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
    this.lastName =
      this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();

    next();
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error.message);
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
