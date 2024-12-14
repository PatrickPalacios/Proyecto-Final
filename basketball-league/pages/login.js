import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, useColorModeValue, Text, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.message || "Credenciales inválidas.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido ${data.user.firstName}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/create-team");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Hubo un problema al intentar iniciar sesión.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="lg">
      <Heading as="h1" mb={6} size="lg" textAlign="center">Iniciar Sesión</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ejemplo@correo.com" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" width="full">Iniciar sesión</Button>
          <Text align="center" mt={4}>¿No tienes cuenta? <Link href="/register" color="teal.500">Regístrate aquí</Link></Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
