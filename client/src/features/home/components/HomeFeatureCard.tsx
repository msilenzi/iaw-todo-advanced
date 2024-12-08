import { Card, Text, useMantineTheme } from '@mantine/core'
import { FeatureType } from '../data/floorplanFeatures'

import classes from './HomeFeatureCard.module.css'

type HomeFeatureCardProps = {
  feature: FeatureType
}

export default function HomeFeatureCard({ feature }: HomeFeatureCardProps) {
  const theme = useMantineTheme()

  return (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={50} stroke={2} color={theme.colors.blue[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  )
}
