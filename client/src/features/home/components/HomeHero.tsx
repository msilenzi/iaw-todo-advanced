import {
  Button,
  Container,
  Paper,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core'

import classes from './HomeHero.module.css'
import { Link } from '@tanstack/react-router'

export default function HomeHero() {
  const theme = useMantineTheme()
  const colorScheme = useComputedColorScheme()

  const bgColor =
    colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1]

  return (
    <Paper shadow="sm" bg={bgColor}>
      <Container className={classes.inner}>
        <Text fw={900} tt="uppercase" c="dimmed" size="xl" pb="xs">
          Floorplan
        </Text>
        <Title className={classes.title}>
          Gestiona tus{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            proyectos de construcción
          </Text>{' '}
          de forma eficiente
        </Title>
        <Text className={classes.description} c="dimmed">
          Centralizá el control de tus planos, proyectos y organizaciones.
          Aprovechá el poder de nuestra IA para descomponer tus planos en
          segundos.
        </Text>
        <Button
          size="xl"
          w="fit-content"
          className={classes.control}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          component={Link}
          to="/auth/signup"
        >
          Registrarse
        </Button>
      </Container>
    </Paper>
  )
}
