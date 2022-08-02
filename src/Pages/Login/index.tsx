import React, { useState } from 'react';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Link } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Container,
  Title,
  Stack,
  LoadingOverlay,
} from '@mantine/core';
import { api } from '../../Services/api';
import { login } from '../../Services/utils';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function Login(props: PaperProps) {
  const form = useForm({
    initialValues: {
      name: '',
      password: '',
    },

    validate: {
      password: (val) => val.length >= 6,
    },
  });

  const username = form.values.name
  const password = form.values.password
  const [visible, setVisible] = useState(false);

  let navigate: NavigateFunction
  navigate = useNavigate()

  function HandleSubmit(event) {
    event.preventDefault();
    api.post('/login/', {
      username,
      password,
    })
      .then((resp) => {
        login(resp.data.token);
        navigate("/perfil")
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container size={500} my={210} >

      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Bem vindo!
      </Title>

      <Text color="dimmed" size="sm" align="center" mt={5}>
        Você não tem uma conta?{' '}
        <Anchor<'a'> href="http://127.0.0.1:5173/register/" size="md" onClick={(event) => event()} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} weight='bold'>
          Criar conta
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" {...props}>

        <LoadingOverlay visible={visible} overlayBlur={2} />
        <form onSubmit={HandleSubmit}>
          <Stack>
            <TextInput
              required
              label="Nome"
              placeholder="Insira seu nome de usuario"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />

            <PasswordInput
              required
              label="Senha"
              placeholder="Insira sua senha"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'A senha deve incluir pelo menos 6 caracteres'}
            />
          </Stack>

          <Group position="center" mt="xl" pt={30}>
            <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              onClick={() => setVisible((v) => !v)}
            >Entrar</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}