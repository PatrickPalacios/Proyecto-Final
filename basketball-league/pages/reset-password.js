import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: "Error",
                description: "Por favor ingresa tu correo electrónico.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);

        try {
            // Realizar una solicitud al backend para enviar el correo de restablecimiento
            const response = await axios.post("/api/reset-password", { email });

            if (response.status === 200) {
                toast({
                    title: "Éxito",
                    description: "Se ha enviado un enlace de restablecimiento a tu correo.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setEmail(""); // Limpiar el campo de correo electrónico
            }
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error.response?.data?.message ||
                    "Hubo un problema al enviar el correo de restablecimiento.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
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
            <Heading as="h1" size="lg" mb={6} textAlign="center">
                Restablecer Contraseña
            </Heading>
            <Text mb={4} textAlign="center" color={useColorModeValue("gray.600", "gray.300")}>
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </Text>
            <form onSubmit={handleResetPassword}>
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
                    <Button
                        type="submit"
                        colorScheme="teal"
                        size="md"
                        width="full"
                        isLoading={isLoading}
                    >
                        Enviar enlace de restablecimiento
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default ResetPassword;
