import { useEffect, useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, Button, Text, Badge, Stack, AppShell, Navbar, Space, Popover, Modal, Divider, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrandTwitter, BrandYoutube, BrandInstagram, Logout } from 'tabler-icons-react';
import { logout } from '../../Services/utils';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';
import { DetailUser } from '../DetailUser';
import { api } from '../../Services/api';
import { Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight } from 'tabler-icons-react';
import { Contacts } from '../Contacts';
import { DetailInvite } from '../DetailInvite';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  social: {
    width: '500px',

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

}));

export function HeaderSimple({ data }) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const [currentPerfil, setCurrentPerfil] = useState([]);
  const [perfis, setPerfis] = useState([]);

  let navigate: NavigateFunction
  navigate = useNavigate()

  const [opned, setOpened] = useState(false);

  // useEffect(() => {
  //   api.get('/perfil/')
  //     .then((resp) => setCurrentPerfil(resp.data))
  //     .catch((error) => console.error(error));
  // }, []);

  function handleLogout() {
    logout();
    navigate('/')
  }

  return (
    <Header height={56} mb={120}>
      <Container className={classes.inner} size={'100%'}>
        <Group position="left">
          <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}
            style={{ borderRadius: '20px', marginLeft: '50px' }}
            onClick={() => setOpened(true)}>Meu perfil
          </Button>
        </Group>

        <Modal
          opened={opned}
          onClose={() => setOpened(false)}
        >
          <DetailUser name={data.nome} title={data.nome_empresa} email={data.email} />
          <Space h="sm" />
          <Divider my="md" />

          <Contacts getContact={data} />
        </Modal>

        <Stack align="left" justify="center" spacing="xs" >

        </Stack>

        <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
        <Group spacing={0} className={classes.social} position="right" noWrap >
          <ActionIcon style={{ marginRight: '50px' }} size="lg" color={'red'} onClick={() => handleLogout()}>
            <Logout size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </Header>
  );
}