import { Avatar, Group, Menu, Text, Title, UnstyledButton } from '@mantine/core'
import GenericNavbar from './GenericNavbar'
import { useState } from 'react'
import { IconChevronDown, IconLogout } from '@tabler/icons-react'

import classes from './AuthenticatedNavbar.module.css'
import { useStore } from '@Common/store'

export default function AuthenticatedNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useStore((state) => state.user)
  const logout = useStore((state) => state.logout)

  const fullName = `${user!.firstName} ${user!.lastName}`

  return (
    <GenericNavbar>
      <Title order={3} className={classes.title}>
        Todo Advanced
      </Title>
      <Menu
        width={192}
        position="bottom-end"
        shadow="md"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setIsMenuOpen(false)}
        onOpen={() => setIsMenuOpen(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton
            className={`${classes.user} ${isMenuOpen ? classes.userActive : ''}`}
          >
            <Group gap="xs" align="center">
              <Avatar radius="xl" size="sm" color="initials" name={fullName} />
              <Text fw={500} size="sm" className={classes.userName}>
                {fullName}
              </Text>
              <IconChevronDown size={12} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={16} stroke={1.5} />}
            onClick={() => void logout()}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </GenericNavbar>
  )
}
