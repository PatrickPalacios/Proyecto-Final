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
} from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple (puedes personalizarla o conectar con un backend)
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

        // Lógica para manejar inicio de sesión (puedes conectar con un backend aquí)
        toast({
            title: "Inicio de sesión exitoso",
            description: `Bienvenido ${email}`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Limpiar campos
        setEmail("");
        setPassword("");
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
        </Box>
    );
};

export default Login;


