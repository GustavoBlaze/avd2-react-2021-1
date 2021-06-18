import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "../services/api";

interface IChampion {
  id: string;
  ano: string;
  sede: string;
  campeao: string;
}

interface HomeProps {
  champions: IChampion[];
}

export async function getServerSideProps() {
  const { data: champions } = await api.get("worldcup");

  return {
    props: {
      champions,
    },
  };
}

export default function Home({ champions: initialChampions = [] }: HomeProps) {
  const router = useRouter();
  const [champions, setChampions] = useState(initialChampions);

  async function updateChampions() {
    const { data } = await api.get("worldcup");
    setChampions(data);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { target: form } = event;

    const data = {
      ano: form.ano.value,
      sede: form.sede.value,
      campeao: form.campeao.value,
    };

    api.post("/worldcup", data).then(updateChampions);

    form.reset();
  }

  function handleDetails(campeao) {
    router.push(`/details/${campeao}`);
  }

  function handleDelete(id) {
    api.delete(`/worldcup/${id}`).then(updateChampions);
  }

  return (
    <Flex
      direction="column"
      alignItems="stretch"
      maxW="700px"
      w="100vw"
      h="100vh"
      margin="0 auto"
      p={8}
    >
      <Heading size="lg" mb={4}>
        Cadastrar campeão
      </Heading>

      <Stack
        direction="column"
        spacing={4}
        as="form"
        onSubmit={handleSubmit}
        mb={6}
      >
        <FormControl isRequired>
          <FormLabel fontWeight="bold">Ano</FormLabel>
          <Input placeholder="Digite o ano" type="text" name="ano"></Input>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="bold">Sede</FormLabel>
          <Input placeholder="Digite a sede" type="text" name="sede"></Input>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="bold">Campeão</FormLabel>
          <Input
            placeholder="Digite o campeão"
            type="text"
            name="campeao"
          ></Input>
        </FormControl>

        <Button colorScheme="teal" size="lg" type="submit">
          Enviar
        </Button>
      </Stack>

      <Heading size="lg" mb={4}>
        Campeões
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th textAlign="center">Ano</Th>
            <Th textAlign="center">Sede</Th>
            <Th textAlign="center">Campeao</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {champions.map(({ id, ano, sede, campeao }) => (
            <Tr key={id}>
              <Td textAlign="center">{ano}</Td>
              <Td textAlign="center">{sede}</Td>
              <Td textAlign="center">{campeao}</Td>
              <Td>
                <Stack direction="row">
                  <Button
                    colorScheme="blue"
                    onClick={() => handleDetails(campeao)}
                  >
                    Detalhes
                  </Button>
                  <Button colorScheme="red" onClick={() => handleDelete(id)}>
                    Excluir
                  </Button>
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
