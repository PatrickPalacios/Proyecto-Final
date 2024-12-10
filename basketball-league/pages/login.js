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
    Text,
    Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de los campos
        if (!email || !password || !name || !lastName || !age) {
            toast({
                title: "Error",
                description: "Por favor completa todos los campos.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Validar que la edad sea un número
        if (isNaN(age) || age <= 0) {
            toast({
                title: "Error",
                description: "La edad debe ser un número positivo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Lógica para manejar inicio de sesión
        toast({
            title: "Inicio de sesión exitoso",
            description: `Bienvenido ${name} ${lastName}`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Limpiar campos
        setEmail("");
        setPassword("");
        setName("");
        setLastName("");
        setAge("");
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
                    <FormControl id="name" isRequired>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre"
                        />
                    </FormControl>
                    <FormControl id="lastName" isRequired>
                        <FormLabel>Apellidos</FormLabel>
                        <Input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Tus apellidos"
                        />
                    </FormControl>
                    <FormControl id="age" isRequired>
                        <FormLabel>Edad</FormLabel>
                        <Input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Tu edad"
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
                    <Button type="submit" colorScheme="teal" size="md" width="full">
                        Iniciar Sesión
                    </Button>
                    <Box textAlign="center" mt={4}>
                        <Link
                            color="blue.500"
                            fontSize="sm"
                            onClick={() => router.push("/forgot-password")}
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </Box>
                    <Box textAlign="center" mt={4}>
                        <Text fontSize="sm">
                            ¿No tienes una cuenta?{" "}
                            <Link
                                color="blue.500"
                                fontWeight="bold"
                                onClick={() => router.push("/register")}
                            >
                                Crea una aquí
                            </Link>
                        </Text>
                    </Box>
                     {/* Botón para regresar a la página anterior */}
                     <Box textAlign="center" mt={4}>
                        <Button
                            colorScheme="gray"
                            variant="outline"
                            onClick={() => router.back()} // Esto lleva al usuario a la página anterior
                        >
                            Regresar
                        </Button>
                    </Box>
                </VStack>
            </form>
        </Box>
    );
};

export default Login;

