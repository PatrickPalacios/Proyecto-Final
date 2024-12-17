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
    HStack,
    Divider,
    Flex,
    Textarea,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { jsPDF } from 'jspdf'; // Importa jsPDF para la descarga en PDF
import Layout from '../components/Layout';

const CreateTeam = () => {
    const [teamData, setTeamData] = useState({
        name: '',
        playerCount: 0,
        players: Array(12).fill({
            firstName: '',
            lastName: '',
            curp: '',
            address: '',
            bloodType: '',
            phone: '',
            playerNumber: '',  // Agregamos el número de jugador aquí
        }),
    });
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamData({ ...teamData, [name]: value });
    };

    const handlePlayerChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPlayers = [...teamData.players];
        updatedPlayers[index] = { ...updatedPlayers[index], [name]: value };
        setTeamData({ ...teamData, players: updatedPlayers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: 'Equipo registrado',
            description: 'La información del equipo ha sido guardada.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Cédula de Inscripción - Liga de Básquetbol', 20, 20);
        doc.setFontSize(12);
        doc.text(`Nombre del Equipo: ${teamData.name}`, 20, 40);
        doc.text('Jugadores:', 20, 50);

        teamData.players.slice(0, teamData.playerCount).forEach((player, index) => {
            doc.text(
                `${index + 1}. ${player.firstName} ${player.lastName} | CURP: ${player.curp} | Dirección: ${player.address} | Sangre: ${player.bloodType} | Tel: ${player.phone} | No. Jugador: ${player.playerNumber}`,
                20,
                60 + index * 10
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
                                    <FormControl mt={2}>
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
                                        <FormLabel>Dirección</FormLabel>
                                        <Textarea
                                            name="address"
                                            placeholder="Dirección"
                                            onChange={(e) => handlePlayerChange(index, e)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Tipo de sangre</FormLabel>
                                        <Input
                                            type="text"
                                            name="bloodType"
                                            placeholder="Ej. O+"
                                            onChange={(e) => handlePlayerChange(index, e)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Teléfono</FormLabel>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            placeholder="Teléfono"
                                            onChange={(e) => handlePlayerChange(index, e)}
                                        />
                                    </FormControl>
                                    {/* Campo para ingresar el número de jugador */}
                                    <FormControl>
                                        <FormLabel>Número de Jugador</FormLabel>
                                        <Input
                                            type="text"
                                            name="playerNumber"
                                            placeholder="Número de Jugador"
                                            onChange={(e) => handlePlayerChange(index, e)}
                                        />
                                    </FormControl>
                                </Box>
                            ))}
                            <Button type="submit" colorScheme="teal" size="md" width="full">
                                Guardar Equipo
                            </Button>
                        </VStack>
                    </form>
                </Box>

                {/* Lado Derecho - Vista previa */}
                <Box w={{ base: '100%', md: '50%' }} p={4}>
                    <Heading as="h2" size="md" mb={4} textAlign="center">
                        Vista Previa - Cédula de Inscripción
                    </Heading>
                    <Box borderWidth="1px" p={4} borderRadius="lg">
                        <Text fontWeight="bold">Nombre del equipo:</Text> {teamData.name}
                        <Divider my={2} />
                        <Text fontWeight="bold">Jugadores:</Text>
                        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                            {teamData.players.slice(0, teamData.playerCount).map((player, index) => (
                                <GridItem key={index} borderWidth="1px" p={4} borderRadius="lg">
                                    <Text fontWeight="bold">{index + 1}. {player.firstName} {player.lastName}</Text>
                                    <Text>CURP: {player.curp}</Text>
                                    <Text>Dirección: {player.address}</Text>
                                    <Text>Tipo de Sangre: {player.bloodType}</Text>
                                    <Text>Teléfono: {player.phone}</Text>
                                    <Text>Número de Jugador: {player.playerNumber}</Text> {/* Mostrar el número de jugador */}
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                    <HStack mt={4} spacing={4} justify="center">
                        <Button colorScheme="blue" onClick={generatePDF}>
                            Descargar PDF
                        </Button>
                        <Button colorScheme="green" onClick={() => window.print()}>
                            Imprimir Cédula
                        </Button>
                    </HStack>
                </Box>
            </Flex>
        </Layout>
    );
};

export default CreateTeam;
