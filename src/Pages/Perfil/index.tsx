import { Children, useEffect, useState } from "react"
import { api } from "../../Services/api";
import React from 'react';
import { Avatar, Table, Group, Text, ActionIcon, ScrollArea, Paper, Box, Button, useMantineTheme } from '@mantine/core';

import { Menu } from '@mantine/core';

import {
  SquareCheck,
  Package,
  Users,
  Calendar,
  ChevronDown,
  Check,
  ExternalLink,
  X,
} from 'tabler-icons-react';

import { HeaderSimple } from "../../components/Header";
import { showNotification } from "@mantine/notifications";
import { DetailInvite } from "../../components/DetailInvite";
import { Contacts } from "../../components/Contacts";

// interface User {
//   id: number;
//   nome: string;
//   email: string;
//   nome_empresa: string;
//   contatos: string[];
// }

export function Perfil() {
  const [perfis, setPerfis] = useState([]);
  const [currentPerfil, setCurrentPerfil] = useState({});
  const [invites, setInvites] = useState([]);
  const [NewRequest, setNewRequest] = useState(false);

  useEffect(() => {
    api.get('/perfil/')
      .then((resp) => setCurrentPerfil(resp.data))
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));

    api.get('/convites/')
      .then((resp) => setInvites(resp.data))
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));
  }, []);

  useEffect(() => {
    api.get('/perfis/')
      .then((resp) => setPerfis(resp.data))
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));
  }, [NewRequest])

  function invite(id) {
    api.post(`/convites/convidar/${id}`)
      .then(() => showNotification({
        title: 'Convite enviado!',
        message: 'Parabéns, seu convite foi enviado com sucesso.',
        icon: <Check />
      }),
      )
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));
  }

  const rows = perfis?.map((perfil: any) => perfil.id == currentPerfil?.id ? null : (
    <tr key={perfil.id}>

      <td>
        <Group spacing="sm">
          <div>
            <Text size="sm" weight={500}>
              {perfil.nome}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">{perfil.email}</Text>
      </td>
      <td>
        <Text size="sm">{perfil.nome_empresa}</Text>
      </td>
      <td>
        <Group spacing={0} position="left">
          {perfil.pode_convidar ? <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} size="xs" onClick={() => invite(perfil.id)}>
            Convidar
          </Button > : null}
        </Group>
      </td>
      <td>
        <DetailInvite detail={perfis} setNewRequest={setNewRequest} />
      </td>
    </tr>
  ));

  return (
    <>
      <HeaderSimple data={currentPerfil} />

      <Box sx={{
        marginLeft: '30vw',
        marginRight: '30vw',
        padding: '20px',
      }} style={{ border: '1px solid #313131', borderRadius: '5px' }}>
        <ScrollArea >
          <Table sx={{ minWidth: 400 }} verticalSpacing="lg" >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Nome da empresa</th>
                <th>Convidar</th>
                <th>Pendentes</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
}
