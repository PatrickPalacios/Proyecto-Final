import Head from "next/head";
import Image from "next/image"; // Importación del componente Image
import { Box, Flex, Text, Stack, Button, Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router"; // Importación de useRouter

const Layout = ({ children }) => {
  const router = useRouter(); // Inicializamos el router para manejar la navegación
  const { colorMode, toggleColorMode } = useColorMode(); // Hook de Chakra para el cambio de color de tema

  return (
    <div>
      <Head>
        <title>Basquetball League</title>
      </Head>

      <Box>
        <Flex
          bg={useColorModeValue("gray.300", "gray.600")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 2 }}
          borderTop={1}
          borderBottom={1}
          borderStartStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text fontFamily={"heading"} color={useColorModeValue("gray.800", "white")}>
              {/* Imagen del logotipo */}
              <Image
                src="/logo.jpg" // Ruta de la imagen en la carpeta public
                alt="Logo de la Liga de Básquetbol"
                width={80} // Ajusta tamaño
                height={80}
                style={{ borderRadius: "50%" }} // Hace que las puntas sean redondas
              />
            </Text>
          </Flex>

          <Stack flex={{ base: 1 }} justify={"flex-end"} direction={"row"} spacing={6}>
            {/* Botón Sign in redirige a /login */}
            <Button
              fontSize={"md"}
              fontWeight={600}
              color={"gray.600"}
              variant={"link"}
              bg={"blue.500"}
              _hover={{ bg: "blue.300" }}
              onClick={() => router.push("/login")} // Redirige al login
            >
              Sign in
            </Button>
            {/* Botón Sign up redirige a /register */}
            <Button
              fontSize={"md"}
              fontWeight={600}
              color={"gray.600"}
              variant={"link"}
              bg={"blue.400"}
              _hover={{ bg: "blue.300" }}
              onClick={() => router.push("/register")} // Redirige al registro
            >
              Sign up
            </Button>

            {/* Switch para cambiar entre tema claro y oscuro */}
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode} // Cambia el color del tema
              colorScheme="teal" // Color del switch
              size="lg" // Tamaño grande
            />
          </Stack>
        </Flex>
      </Box>

      <Box>{children}</Box>
    </div>
  );
};

export default Layout;
