import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Heading,
    VStack,
    useToast,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const InscribirEquipo = () => {
    const [teamName, setTeamName] = useState("");
    const [branch, setBranch] = useState("");
    const [category, setCategory] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [age, setAge] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [phone, setPhone] = useState("");
    const [playerNumber, setPlayerNumber] = useState("");
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        if (
            !teamName ||
            !branch ||
            !category ||
            !playerName ||
            !age ||
            !bloodType ||
            !phone ||
            !playerNumber
        ) {
            toast({
                title: "Error",
                description: "Por favor completa todos los campos.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Lógica para manejar la inscripción (puedes enviar a tu backend aquí)
        toast({
            title: "Equipo inscrito exitosamente",
            description: `El equipo ${teamName} fue inscrito correctamente.`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Limpiar los campos
        setTeamName("");
        setBranch("");
        setCategory("");
        setPlayerName("");
        setAge("");
        setBloodType("");
        setPhone("");
        setPlayerNumber("");
    };

    return (
        <Box
            maxW="lg"
            mx="auto"
            mt={10}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
        >
            <Heading as="h1" mb={6} size="lg" textAlign="center">
                Inscribir Equipo
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="teamName" isRequired>
                        <FormLabel>Nombre del Equipo</FormLabel>
                        <Input
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Nombre del equipo"
                        />
                    </FormControl>
                    <FormControl id="branch" isRequired>
                        <FormLabel>Rama</FormLabel>
                        <Select
                            placeholder="Selecciona una rama"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        >
                            <option value="varonil">Varonil</option>
                            <option value="femenil">Femenil</option>
                        </Select>
                    </FormControl>
                    <FormControl id="category" isRequired>
                        <FormLabel>Categoría</FormLabel>
                        <Select
                            placeholder="Selecciona una categoría"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="prebenjamin">Prebenjamin: 6-7 años</option>
                            <option value="benjamin">Benjamin: 8-9 años</option>
                            <option value="alevin">Alevin: 10-11 años</option>
                            <option value="infantil">Infantil: 12-13 años</option>
                            <option value="cadete">Cadete: 14-15 años</option>
                            <option value="junior">Junior: 16-17 años</option>
                            <option value="sub-22">Sub-22: 18-21 años</option>
                            <option value="senior">Senior: 22 o más años</option>
                            <option value="libre">Libre: cualquier edad</option>
                        </Select>
                    </FormControl>
                    <FormControl id="playerName" isRequired>
                        <FormLabel>Nombre del Jugador(a)</FormLabel>
                        <Input
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Nombre del jugador(a)"
                        />
                    </FormControl>
                    <FormControl id="age" isRequired>
                        <FormLabel>Edad</FormLabel>
                        <Input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Edad"
                        />
                    </FormControl>
                    <FormControl id="bloodType" isRequired>
                        <FormLabel>Tipo Sanguíneo</FormLabel>
                        <Input
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            placeholder="Ejemplo: O+"
                        />
                    </FormControl>
                    <FormControl id="phone" isRequired>
                        <FormLabel>Teléfono</FormLabel>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Teléfono de contacto"
                        />
                    </FormControl>
                    <FormControl id="playerNumber" isRequired>
                        <FormLabel>Número de Jugador</FormLabel>
                        <Input
                            type="number"
                            value={playerNumber}
                            onChange={(e) => setPlayerNumber(e.target.value)}
                            placeholder="Número del jugador"
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" size="md" width="full">
                        Inscribir Equipo
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default InscribirEquipo;
