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
    Link,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (!email || !password) {
            toast({
                title: "Error",
                description: "Por favor completa todos los campos.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            // Llamada a la API para validar credenciales
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Mostrar error si las credenciales son inválidas
                toast({
                    title: "Error",
                    description: data.message || "Credenciales inválidas.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            // Si la autenticación es exitosa
            toast({
                title: "Inicio de sesión exitoso",
                description: `Bienvenido ${data.user.name}`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Redirigir al usuario a la página de inscripción de equipo
            router.push("/inscribir-equipo");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            toast({
                title: "Error",
                description: "Hubo un problema al intentar iniciar sesión.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
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
                Iniciar Sesión
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
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
                    <Button type="submit" colorScheme="teal" size="md" width="full">
                        Iniciar Sesión
                    </Button>
                </VStack>
            </form>

            {/* Opciones adicionales */}
            <Box mt={4} textAlign="center">
                <Link
                    color="blue.400"
                    fontSize="sm"
                    onClick={() => router.push("/reset-password")}
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </Box>
            <Box mt={2} textAlign="center">
                <Link
                    color="blue.400"
                    fontSize="sm"
                    onClick={() => router.push("/")}
                >
                    Regresar a la página principal
                </Link>
            </Box>
        </Box>
    );
};

export default Login;

