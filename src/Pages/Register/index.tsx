import React from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Container,
  Stack,
  Title,
} from '@mantine/core';
import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

import { NavigateFunction, useNavigate } from "react-router-dom";

import { api } from '../../Services/api'

interface GroupProps {
  direction: string,
}

export function Register(props: PaperProps) {
  const form = useForm({
    initialValues: {
      name: '',
      companyName: '',
      email: '',
      tel: '',
      password: '',
    },

    validate: {
      password: (val) => val.length >= 6,
      email: (val) => /^\S+@\S+$/.test(val),
    },
  });

  const nome = form.values.name
  const email = form.values.email
  const senha = form.values.password
  const nome_empresa = form.values.companyName

  let navigate = useNavigate()

  function HandleSubmit(event) {
    event.preventDefault();
    api.post('/perfis/', {
      nome: nome,
      email: email,
      senha: senha,
      nome_empresa: nome_empresa,
    })
      .then(() => { showNotification({
        title: 'Conta criada!',
        message: 'Parabéns, sua conta foi criada com sucesso.',
        icon: <Check />
      }),
        navigate("/")
      })
      .catch(() => showNotification({
        title: 'Algo deu errado!',
        color: 'red',
        message: 'Verifique novamente!',
        icon: <X />
      }));
  }

  return (
    <Container size={500} my={210} >

      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Registre-se
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" {...props}>

        <form onSubmit={HandleSubmit}>
          <Stack>

            <TextInput
              label="Nome"
              placeholder="Insira seu nome de usuario"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />

            <TextInput
              label="Nome da empresa"
              placeholder="Insira o nome da empresa"
              value={form.values.companyName}
              onChange={(event) => form.setFieldValue('companyName', event.currentTarget.value)}
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Senha"
              placeholder="Insira sua senha..."
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'A senha deve incluir pelo menos 6 caracteres'}
            />


          </Stack>

          <Group position="center" mt="xl" >
            <Button type="submit" fullWidth variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Registrar</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}