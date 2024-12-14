import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, useColorModeValue, FormHelperText } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.message || "Hubo un error al registrarse.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Registrado exitosamente",
        description: "Ahora puedes iniciar sesión.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Hubo un problema al intentar registrarse.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="lg">
      <Heading as="h1" mb={6} size="lg" textAlign="center">Regístrate</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="firstName" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl id="lastName" isRequired>
            <FormLabel>Apellido</FormLabel>
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormHelperText>Debe tener al menos 6 caracteres.</FormHelperText>
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirmar Contraseña</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" width="full">Registrarse</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
