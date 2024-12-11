import Layout from "../components/Layout";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      w="100%"
      h="100vh"
      bgImage="url('/background.jpg')" // Ruta de la imagen en la carpeta public
      bgSize="cover" // Asegura que la imagen cubra todo el área
      bgPosition="center" // Centra la imagen
      bgRepeat="no-repeat" // No repite la imagen
    >
      <Layout>
        {/* Aquí puedes añadir contenido adicional */}
      </Layout>
      <h2 style={{ color: "white",
         textAlign: "center",
         marginTop: "30px",
         fontSize: "24px", 
         }}>
      "Tu momento de brillar empieza aquí."
      </h2>
    </Box>
  );
}
