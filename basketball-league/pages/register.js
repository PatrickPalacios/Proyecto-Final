import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    useToast,
    useColorModeValue,
    FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de campos
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Error",
                description: "Por favor completa todos los campos.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Lógica para registrar al usuario (puedes conectar con un backend aquí)
        toast({
            title: "Registro exitoso",
            description: `Bienvenido, ${name}! Ahora puedes iniciar sesión.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Limpiar los campos del formulario
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Redirigir a la página de login
        router.push("/login");
    };

    return (
        <Box
            maxW="md"
            mx="auto"
            mt={10}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
        >
            <Heading as="h1" mb={6} size="lg" textAlign="center">
                Crear Cuenta
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="name" isRequired>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre"
                        />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@correo.com"
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Contraseña</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Tu contraseña"
                        />
                    </FormControl>
                    <FormControl id="confirmPassword" isRequired>
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirma tu contraseña"
                        />
                        <FormHelperText>Las contraseñas deben coincidir.</FormHelperText>
                    </FormControl>
                    <Button type="submit" colorScheme="teal" size="md" width="full">
                        Crear Cuenta
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default Register;
