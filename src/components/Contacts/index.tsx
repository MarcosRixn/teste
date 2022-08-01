import { useEffect, useState } from 'react';
import { Modal, Button, Group, Text, Space, Divider, useMantineTheme, Avatar, Indicator, Grid, SimpleGrid, UnstyledButton } from '@mantine/core';
import { api } from '../../Services/api';
import { Phone, Plus } from 'tabler-icons-react';

// interface contactdata {
//   contatos: {
//     id: number,
//     nome: string,
//     email: string,
//   }[],
//   nome: string,
//   email: string,
//   nome_empresa: string,
//   id: number,
// }

export function Contacts({ getContact }) {
  const [opened, setOpened] = useState(false);
  const [currentPerfil, setCurrentPerfil] = useState([]);
  const theme = useMantineTheme();

  const obterContatos = getContact.contatos

  return (
    <>
      <Text size={'lg'} weight={700} style={{ textAlign: 'center' }}>Seus contatos</Text>
      {
        obterContatos?.map((contact: any) => (

          <Group spacing="sm" key={contact.id} >
            <UnstyledButton >
              <Space h="lg" />
              <Group>
                <Avatar size={40} ></Avatar>
                <div>
                  <Text>{contact.nome}</Text>
                  <Text size="xs" color="dimmed">{contact.email}</Text>
                </div>
              </Group>
            </UnstyledButton>
          </Group>

        ))}
    </>
  );
}