import connectDB from "../../utils/connectDB";
import User from "../../models/User"; // Modelo de usuario
import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "El correo electrónico es requerido." });
    }

    try {
        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Simula un enlace de restablecimiento (debería ser un token seguro)
        const resetLink = `https://tu-dominio.com/reset-password/${user._id}`;

        // Configuración del transporte de nodemailer
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER, // Tu correo
                pass: process.env.EMAIL_PASS, // Tu contraseña
            },
        });

        // Enviar el correo
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Restablecer Contraseña",
            html: `
                <p>Hola ${user.name},</p>
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>Si no solicitaste este correo, ignóralo.</p>
            `,
        });

        res.status(200).json({ message: "Correo enviado exitosamente." });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor." });
    }
}
