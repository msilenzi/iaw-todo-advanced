import {
  Container,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import floorplanFeatures from '../data/floorplanFeatures'
import HomeFeatureCard from './HomeFeatureCard'
import classes from './HomeFeaturesSection.module.css'

export default function HomeFeaturesSection() {
  const theme = useMantineTheme()

  return (
    <Container size="lg" py={theme.spacing.xl}>
      <Title order={2} className={classes.title} ta="center" mt="lg">
        Por qué usar Floorplan
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Floorplan es la solución ideal para gestionar tus proyectos de
        construcción de forma eficiente y moderna. Nuestra plataforma está
        diseñada para simplificar procesos, ahorrar tiempo y maximizar la
        precisión. Floorplan te permite concentrarte en lo que realmente
        importa: llevar tus proyectos al siguiente nivel.
      </Text>

      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="xl" mt={50}>
        {floorplanFeatures.map((feature, i) => (
          <HomeFeatureCard key={i} feature={feature} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
