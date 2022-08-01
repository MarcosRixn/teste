import { useEffect, useState } from 'react';
import { Modal, Button, Group, Text, Space, Divider, useMantineTheme } from '@mantine/core';
import { api } from '../../Services/api';
import { Check, Plus, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

export function DetailInvite({ detail, setNewRequest }) {
  const [opened, setOpened] = useState(false);
  const [invites, setInvites] = useState([]);
  const [perfis, setPerfis] = useState([]);
  const [CurrentInvitedPerfil, setCurrentInvitedPerfil] = useState([]);

  const theme = useMantineTheme();

  useEffect(() => {
    api.get('/convites/') // Retorna todos os convites
      .then((resp) => {
        const invitesInfo = resp.data.map((invite) => {
          const findedInvite = detail?.find((perfil) => invite.solicitante == perfil.id);
          return { ...findedInvite, inviteId: invite.id };
        });
        setInvites(invitesInfo);
      })
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));
  }, [detail]);

  function invite(id: any) {
    api.post(`/convites/convidar/${id}`)
      .then(() => showNotification({
        title: 'Convite enviado!',
        message: 'Parabéns, o convite foi enviado com sucesso.',
        icon: <Check />
      }))
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));

    setCurrentInvitedPerfil(id);
  }

  function accept(id: any) {
    api.post(`/convites/aceitar/${id}`)
      .then(() => {
        setNewRequest(true)
        showNotification({
          title: 'Convite aceito!',
          message: 'O convite foi aceito!',
          icon: <Check />
        })
      })
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));
  }

  return (
    <>
      <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.8}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        style={{ textAlign: 'center' }}
      >
        <h2>Pendentes</h2>
        {invites?.map((invite) => (
          <div key={invite.inviteId}>

            <Space h="md" />
            <Divider my="md" />
            <Space h="xl" />

            <Text>{invite.nome}</Text>

            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              fullWidth
              style={{ borderRadius: '20px' }}
              onClick={() => {
                setOpened(false); accept(invite.inviteId)
                setNewRequest((prev) => (!prev))
              }}>
              Aceitar
            </Button>
          </div>
        ))}
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} style={{ borderRadius: '30px' }} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
          <Plus></Plus>
        </Button>
      </Group>
    </>
  );
}