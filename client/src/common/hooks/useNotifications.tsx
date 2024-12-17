import { Text } from '@mantine/core'
import { NotificationData, notifications } from '@mantine/notifications'

type CustomNotificationData = {
  title: string
  message: string
  autoClose?: NotificationData['autoClose']
}

export default function useNotifications() {
  function showSuccessNotification({
    title,
    message,
    autoClose = 4000,
  }: CustomNotificationData) {
    notifications.show({
      title: <Text fw={700}>{title}</Text>,
      message,
      color: 'teal',
      radius: 'sm',
      autoClose: autoClose,
      withBorder: true,
    })
  }

  function showErrorNotification({
    title,
    message,
    autoClose = 4000,
  }: CustomNotificationData) {
    notifications.show({
      title: <Text fw={700}>{title}</Text>,
      message,
      color: 'red',
      radius: 'sm',
      autoClose: autoClose,
      withBorder: true,
    })
  }

  return { showSuccessNotification, showErrorNotification }
}
