import { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    useToast,
    VStack,
} from '@chakra-ui/react';
import Layout from '../components/Layout'; // Asumiendo que tienes un Layout para tu diseño general

const CreateTeam = () => {
    const [teamData, setTeamData] = useState({
        name: '',
        city: '',
        championshipsWon: 0,
    });
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamData({ ...teamData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teamData),
            });

            if (!response.ok) {
                throw new Error('Error al crear el equipo');
            }

            const data = await response.json();

            toast({
                title: 'Equipo creado',
                description: `El equipo "${data.name}" se ha creado exitosamente.`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            setTeamData({
                name: '',
                city: '',
                championshipsWon: 0,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Layout>
            <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg">
                <Heading as="h1" mb={6} size="lg" textAlign="center">
                    Crear Equipo
                </Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
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
                        <FormControl id="city" isRequired>
                            <FormLabel>Ciudad</FormLabel>
                            <Input
                                type="text"
                                name="city"
                                value={teamData.city}
                                onChange={handleChange}
                                placeholder="Ej. Los Angeles"
                            />
                        </FormControl>
                        <FormControl id="championshipsWon">
                            <FormLabel>Campeonatos Ganados</FormLabel>
                            <Input
                                type="number"
                                name="championshipsWon"
                                value={teamData.championshipsWon}
                                onChange={handleChange}
                                placeholder="Ej. 17"
                                min={0}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" size="md" width="full">
                            Crear Equipo
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Layout>
    );
};

export default CreateTeam;
