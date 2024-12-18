import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useToast,
  VStack,
  Divider,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Layout from "../components/Layout";

const CreateTeam = () => {
  const [teamData, setTeamData] = useState({
    name: "",
    playerCount: 0,
    players: Array(12).fill({
      playerNumber: "",
      firstName: "",
      lastName: "",
      curp: "",
      address: "",
      bloodType: "",
      phone: "",
    }),
  });

  const toast = useToast();

  // Manejo de cambios en el input del equipo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({ ...teamData, [name]: value });
  };

  // Manejo de cambios en los inputs de jugadores
  const handlePlayerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPlayers = [...teamData.players];
    updatedPlayers[index] = { ...updatedPlayers[index], [name]: value };
    setTeamData({ ...teamData, players: updatedPlayers });
  };

  // Validación de campos antes de enviar
  const validateTeamData = () => {
    if (!teamData.name || teamData.playerCount === 0) {
      toast({
        title: "Campos del equipo incompletos",
        description:
          "Por favor, complete el nombre del equipo y el número de jugadores.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    // Validación de jugadores
    for (let i = 0; i < teamData.playerCount; i++) {
      const player = teamData.players[i];
      if (
        !player.playerNumber ||
        !player.firstName ||
        !player.lastName ||
        !player.curp ||
        !player.phone ||
        !player.bloodType ||
        !player.address
      ) {
        toast({
          title: `Jugador ${i + 1} tiene campos incompletos`,
          description: "Por favor, complete todos los campos del jugador.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return false;
      }
    }

    return true;
  };

  // Función para enviar los datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar los datos antes de enviar
    if (!validateTeamData()) return;

    try {
      const response = await axios.post("/api/teams", {
        name: teamData.name,
        playerCount: teamData.playerCount,
        players: teamData.players.slice(0, teamData.playerCount),
      });

      toast({
        title: "Equipo registrado",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error al registrar el equipo",
        description: error.response
          ? error.response.data.error
          : "Error desconocido",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Generar PDF respetando el formato visual
  // Generar PDF respetando los datos del formulario
  const generatePDF = async () => {
    try {
      // Crear una instancia de jsPDF
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10;
      let currentY = margin;

      // Título del documento
      pdf.setFontSize(16);
      pdf.text(
        "Cédula de Inscripción",
        pdf.internal.pageSize.getWidth() / 2,
        currentY,
        { align: "center" }
      );
      currentY += 10;

      // Nombre del equipo
      pdf.setFontSize(12);
      pdf.text(`Nombre del Equipo: ${teamData.name}`, margin, currentY);
      currentY += 10;

      // Datos de los jugadores
      teamData.players
        .slice(0, teamData.playerCount)
        .forEach((player, index) => {
          pdf.setFontSize(10);
          pdf.text(`Jugador ${index + 1}`, margin, currentY);
          currentY += 6;
          pdf.text(`Número: ${player.playerNumber}`, margin + 5, currentY);
          currentY += 5;
          pdf.text(
            `Nombre: ${player.firstName} ${player.lastName}`,
            margin + 5,
            currentY
          );
          currentY += 5;
          pdf.text(`CURP: ${player.curp}`, margin + 5, currentY);
          currentY += 5;
          pdf.text(`Teléfono: ${player.phone}`, margin + 5, currentY);
          currentY += 5;
          pdf.text(`Tipo de Sangre: ${player.bloodType}`, margin + 5, currentY);
          currentY += 5;
          pdf.text(`Dirección: ${player.address}`, margin + 5, currentY);
          currentY += 10;

          // Agregar una nueva página si el contenido sobrepasa el límite
          if (currentY > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage();
            currentY = margin;
          }
        });

      // Descargar el PDF
      pdf.save("cedula_inscripcion.pdf");
    } catch (error) {
      toast({
        title: "Error al generar PDF",
        description: "Hubo un problema al generar el documento.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Flex direction={{ base: "column", md: "row" }} p={6}>
        {/* Lado Izquierdo - Formulario */}
        <Box
          w={{ base: "100%", md: "50%" }}
          p={4}
          borderRightWidth={{ md: "1px" }}
        >
          <Heading as="h1" mb={6} size="lg" textAlign="center">
            Registrar Equipo
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel>Nombre del equipo</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={teamData.name}
                  onChange={handleChange}
                  placeholder="Ej. Lakers"
                />
              </FormControl>
              <FormControl id="playerCount" isRequired>
                <FormLabel>Número de jugadores (máximo 12)</FormLabel>
                <Input
                  type="number"
                  name="playerCount"
                  value={teamData.playerCount}
                  onChange={handleChange}
                  placeholder="Ej. 12"
                  min={1}
                  max={12}
                />
              </FormControl>

              <Divider />

              {Array.from({ length: teamData.playerCount }, (_, index) => (
                <Box key={index} borderWidth="1px" p={4} borderRadius="lg">
                  <Text fontWeight="bold">Jugador {index + 1}</Text>
                  <FormControl>
                    <FormLabel>Número del Jugador</FormLabel>
                    <Input
                      type="text"
                      name="playerNumber"
                      value={teamData.players[index].playerNumber}
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      value={teamData.players[index].firstName}
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Apellidos</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      value={teamData.players[index].lastName}
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>CURP</FormLabel>
                    <Input
                      type="text"
                      name="curp"
                      value={teamData.players[index].curp}
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Teléfono</FormLabel>
                    <Input
                      type="text"
                      name="phone"
                      value={teamData.players[index].phone}
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tipo de Sangre</FormLabel>
                    <Input
                      type="text"
                      name="bloodType"
                      value={teamData.players[index].bloodType}
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Dirección</FormLabel>
                    <Input
                      type="text"
                      name="address"
                      value={teamData.players[index].address}
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                </Box>
              ))}

              <Button type="submit" colorScheme="teal" size="lg" w="full">
                Guardar Equipo
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Lado Derecho - Vista previa */}
        <Box
          id="team-preview"
          w={{ base: "100%", md: "50%" }}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Heading as="h2" mb={4} size="md" textAlign="center">
            Cédula de Inscripción
          </Heading>
          <Text fontWeight="bold" mb={4}>
            Nombre del Equipo: {teamData.name}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {teamData.players
              .slice(0, teamData.playerCount)
              .map((player, index) => (
                <GridItem key={index} borderWidth="1px" p={2} borderRadius="lg">
                  <Text fontWeight="bold">#{player.playerNumber}</Text>
                  <Text>
                    {player.firstName} {player.lastName}
                  </Text>
                  <Text>CURP: {player.curp}</Text>
                  <Text>Tel: {player.phone}</Text>
                  <Text>Tipo de Sangre: {player.bloodType}</Text>
                  <Text>Dirección: {player.address}</Text>
                </GridItem>
              ))}
          </Grid>
          <Button
            mt={6}
            colorScheme="blue"
            size="lg"
            w="full"
            onClick={generatePDF}
          >
            Descargar PDF
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
};

export default CreateTeam;
