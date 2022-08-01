import { createStyles, Avatar, Text, Group, Space } from '@mantine/core';
import { BuildingCommunity, Mail } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  avatar?: string;
  name: string;
  title: string;
  phone?: string;
  email: string;
}

export function DetailUser({ avatar, name, title, phone, email }: UserInfoIconsProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" color={'blue'}/>
        <div>
          <Text size="xl" weight={700} className={classes.name} >
            {name}
          </Text>
          <Space h="xs" />

          <Group noWrap spacing={10} mt={3}>
            <BuildingCommunity size={16} className={classes.icon} />
            <Text size="xs" sx={{ textTransform: 'capitalize' }} color="dimmed">
              {title}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={3}>
            <Mail size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </Group>

        </div>
      </Group>
    </div>
  );
}