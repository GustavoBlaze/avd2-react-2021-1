import {
  Flex,
  Heading,
  Text,
  Stack,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
} from "@chakra-ui/react";
import { api } from "../../services/api";
import Link from "next/link";

interface IChampion {
  id: string;
  ano: string;
  sede: string;
  campeao: string;
}

interface PageProps {
  champions: IChampion[];
}

export const getServerSideProps = async ({ params }) => {
  const { name } = params;
  const { data: champions } = await api.get("worldcup");

  return {
    props: {
      champions: champions.filter(({ campeao }) => campeao === name),
    },
  };
};

export default function Details({ champions }: PageProps) {
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
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">Títulos do campeão</Heading>
        <Link href="/">
          <a>
            <Text color="blue">Voltar</Text>
          </a>
        </Link>
      </Flex>

      <Table>
        <Thead>
          <Tr>
            <Th textAlign="center">Ano</Th>
            <Th textAlign="center">Sede</Th>
            <Th textAlign="center">Campeao</Th>
          </Tr>
        </Thead>
        <Tbody>
          {champions.map(({ id, ano, sede, campeao }) => (
            <Tr key={id}>
              <Td textAlign="center">{ano}</Td>
              <Td textAlign="center">{sede}</Td>
              <Td textAlign="center">{campeao}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Flex>
  );
}
