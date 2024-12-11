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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const toast = useToast();
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validación de campos
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
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
  
      try {
        // Realizar solicitud de registro
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Si la respuesta es exitosa, mostrar mensaje y redirigir al login
          toast({
            title: "Registro exitoso",
            description: data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
  
          // Limpiar los campos del formulario
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
  
          // Redirigir a la página de login
          router.push("/login");
        } else {
          // Si hubo un error en el registro
          toast({
            title: "Error",
            description: data.message || "Hubo un error al registrar el usuario.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Hubo un error en la solicitud.",
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
          Crear Cuenta
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Tu nombre"
              />
            </FormControl>
            <FormControl id="lastName" isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Tu apellido"
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
  