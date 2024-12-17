import { useState } from 'react';
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
  Textarea,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import Layout from '../components/Layout';

const CreateTeam = () => {
  const [teamData, setTeamData] = useState({
    name: '',
    playerCount: 0,
    players: Array(12).fill({
      playerNumber: '',
      firstName: '',
      lastName: '',
      curp: '',
      address: '',
      bloodType: '',
      phone: '',
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

  // Función para enviar los datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/teams', {
        name: teamData.name,
        playerCount: teamData.playerCount,
        players: teamData.players.slice(0, teamData.playerCount),
      });

      toast({
        title: 'Equipo registrado',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error al registrar el equipo',
        description: error.response ? error.response.data.error : 'Error desconocido',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Generar PDF con formato de cédula
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Cédula de Inscripción - Liga de Básquetbol', 20, 20);
    doc.setFontSize(12);
    doc.text(`Nombre del Equipo: ${teamData.name}`, 20, 40);

    let yOffset = 60;
    teamData.players.slice(0, teamData.playerCount).forEach((player, index) => {
      if (index % 3 === 0 && index > 0) yOffset += 20; // Nueva línea cada 3 jugadores

      doc.text(
        `#${player.playerNumber} - ${player.firstName} ${player.lastName} | CURP: ${player.curp} | Tel: ${player.phone}`,
        20,
        yOffset + (index % 3) * 10
      );
    });

    doc.save('cedula_inscripcion.pdf');
  };

  return (
    <Layout>
      <Flex direction={{ base: 'column', md: 'row' }} p={6}>
        {/* Lado Izquierdo - Formulario */}
        <Box w={{ base: '100%', md: '50%' }} p={4} borderRightWidth={{ md: '1px' }}>
          <Heading as="h1" mb={6} size="lg" textAlign="center">
            Registrar Equipo
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              {/* Información del equipo */}
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

              {/* Información de jugadores */}
              {Array.from({ length: teamData.playerCount }, (_, index) => (
                <Box key={index} borderWidth="1px" p={4} borderRadius="lg">
                  <Text fontWeight="bold">Jugador {index + 1}</Text>
                  <FormControl>
                    <FormLabel>Número del Jugador</FormLabel>
                    <Input
                      type="text"
                      name="playerNumber"
                      placeholder="Número"
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Nombre"
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Apellidos</FormLabel>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Apellidos"
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>CURP</FormLabel>
                    <Input
                      type="text"
                      name="curp"
                      placeholder="CURP"
                      onChange={(e) => handlePlayerChange(index, e)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Teléfono</FormLabel>
                    <Input
                      type="text"
                      name="phone"
                      placeholder="Teléfono"
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

        {/* Lado Derecho - Visualización de Jugadores */}
        <Box w={{ base: '100%', md: '50%' }} p={4}>
          <Heading as="h2" mb={4} size="md" textAlign="center">
            Cédula de Inscripción
          </Heading>
          <Text fontWeight="bold" mb={4}>
            Nombre del Equipo: {teamData.name}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {teamData.players.slice(0, teamData.playerCount).map((player, index) => (
              <GridItem key={index} borderWidth="1px" p={2} borderRadius="lg">
                <Text fontWeight="bold">#{player.playerNumber}</Text>
                <Text>{player.firstName} {player.lastName}</Text>
                <Text>CURP: {player.curp}</Text>
                <Text>Tel: {player.phone}</Text>
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
